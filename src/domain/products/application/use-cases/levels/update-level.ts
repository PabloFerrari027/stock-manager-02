import { Either, left, right } from '@/core/either'
import { Level } from '../../../enterprise/entities/level'
import { inject, injectable } from 'tsyringe'
import { NotFoundError } from '@/core/errors/not-found-error'
import { Text } from '@/core/entities/text'
import { LevelsRepository } from '../../repositories/levels-repository'
import { AlreadyExistsError } from '@/core/errors/already-exists-error'
import { TypesRepository } from '../../repositories/types-repository'

interface UpdateLevelRequest {
  id: string
  name?: string
  typeId?: string
  multiBrandPrice?: number
  retailPrice?: number
  salePrice?: number
  targetCost?: number
}

type UpdateLevelResponse = Either<
  NotFoundError | AlreadyExistsError,
  {
    level: Level
  }
>

@injectable()
export class UpdateLevel {
  constructor(
    @inject('LevelsRepository')
    private levelsRepository: LevelsRepository,
    @inject('TypesRepository')
    private typesRepository: TypesRepository,
  ) {}

  async execute(data: UpdateLevelRequest): Promise<UpdateLevelResponse> {
    const level = await this.levelsRepository.findById(data.id)

    if (!level) {
      return left(new NotFoundError())
    }

    if (data.name) {
      const name = Text.create(data.name, 'Pascalcase')

      const getByName = await this.levelsRepository.findByName(name.value)

      if (getByName) {
        const message = `Name ${name} already exists!`

        return left(new AlreadyExistsError(message))
      }

      level.name = name
    }

    if (data.typeId) {
      const type = await this.typesRepository.findById(data.typeId)

      if (!type) {
        return left(new NotFoundError())
      }

      level.typeId = type.id
    }

    if (data.multiBrandPrice) level.multiBrandPrice = data.multiBrandPrice

    if (data.retailPrice) level.retailPrice = data.retailPrice

    if (data.salePrice) level.salePrice = data.salePrice

    if (data.targetCost) level.targetCost = data.targetCost

    await this.levelsRepository.save(level)

    return right({
      level,
    })
  }
}
