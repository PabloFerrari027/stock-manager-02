import { Either, left, right } from '@/core/either'
import { Level } from '../../../enterprise/entities/level'
import { Text } from '@/core/entities/text'
import { inject, injectable } from 'tsyringe'
import { NotFoundError } from '@/core/errors/not-found-error'
import { LevelsRepository } from '../../repositories/levels-repository'
import { TypesRepository } from '../../repositories/types-repository'

interface CreateLevelRequest {
  name: string
  typeId: string
  multiBrandPrice: number
  retailPrice: number
  salePrice: number
  targetCost: number
}

type CreateLevelResponse = Either<
  NotFoundError,
  {
    level: Level
  }
>

@injectable()
export class CreateLevel {
  constructor(
    @inject('LevelsRepository')
    private levelsRepository: LevelsRepository,
    @inject('TypesRepository')
    private typesRepository: TypesRepository,
  ) {}

  async execute(data: CreateLevelRequest): Promise<CreateLevelResponse> {
    const name = Text.create(data.name, 'Pascalcase')

    const type = await this.typesRepository.findById(data.typeId)

    if (!type) {
      return left(new NotFoundError())
    }

    const level = Level.create({
      name,
      isActive: true,
      typeId: type.id,
      multiBrandPrice: data.multiBrandPrice,
      retailPrice: data.retailPrice,
      salePrice: data.salePrice,
      targetCost: data.targetCost,
    })

    await this.levelsRepository.create(level)

    return right({
      level,
    })
  }
}
