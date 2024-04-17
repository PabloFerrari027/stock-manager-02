import { Either, left, right } from '@/core/either'
import { Type } from '../../../enterprise/entities/type'
import { inject, injectable } from 'tsyringe'
import { NotFoundError } from '@/core/errors/not-found-error'
import { Text } from '@/core/entities/text'
import { TypesRepository } from '../../repositories/types-repository'
import { AlreadyExistsError } from '@/core/errors/already-exists-error'
import { CategoriesRepository } from '../../repositories/categories-repository'

interface UpdateTypeRequest {
  id: string
  name?: string
  categoryId?: string
}

type UpdateTypeResponse = Either<
  NotFoundError | AlreadyExistsError,
  {
    type: Type
  }
>

@injectable()
export class UpdateType {
  constructor(
    @inject('TypesRepository')
    private typesRepository: TypesRepository,
    @inject('CategoriesRepository')
    private categoriesRepository: CategoriesRepository,
  ) {}

  async execute(data: UpdateTypeRequest): Promise<UpdateTypeResponse> {
    const type = await this.typesRepository.findById(data.id)

    if (!type) {
      return left(new NotFoundError())
    }

    if (data.name) {
      const name = Text.create(data.name, 'Pascalcase')

      const getByName = await this.typesRepository.findByName(name.value)

      if (getByName) {
        const message = `Name ${name} already exists!`

        return left(new AlreadyExistsError(message))
      }

      type.name = name
    }

    if (data.categoryId) {
      const category = await this.categoriesRepository.findById(data.categoryId)

      if (!category) {
        return left(new NotFoundError())
      }

      type.categoryId = category.id
    }

    await this.typesRepository.save(type)

    return right({
      type,
    })
  }
}
