import { Either, left, right } from '@/core/either'
import { Type } from '../../../enterprise/entities/type'
import { Text } from '@/core/entities/text'
import { inject, injectable } from 'tsyringe'
import { NotFoundError } from '@/core/errors/not-found-error'
import { TypesRepository } from '../../repositories/types-repository'
import { AlreadyExistsError } from '@/core/errors/already-exists-error'
import { CategoriesRepository } from '../../repositories/categories-repository'
import { TypeLevelsList } from '@/domain/products/enterprise/entities/type-levels-list'
import { NotAcceptableError } from '@/core/errors/not-acceptable-error'
import { SKU } from '@/domain/products/enterprise/entities/SKU'

interface CreateTypeRequest {
  name: string
  SKUPrefix: string
  categoryId: string
}

type CreateTypeResponse = Either<
  NotFoundError,
  {
    type: Type
  }
>

@injectable()
export class CreateType {
  constructor(
    @inject('TypesRepository')
    private typesRepository: TypesRepository,
    @inject('CategoriesRepository')
    private categoriesRepository: CategoriesRepository,
  ) {}

  async execute(data: CreateTypeRequest): Promise<CreateTypeResponse> {
    const prefixIsValid = SKU.prefixIsValid(data.SKUPrefix)

    if (prefixIsValid) {
      const message = `Prefix ${data.SKUPrefix} does not meet standards!`
      return left(new NotAcceptableError(message))
    }

    if (data.SKUPrefix.length !== 2) {
      const message = `Prefix ${data.SKUPrefix} does not meet standards!`
      return left(new NotAcceptableError(message))
    }

    const name = Text.create(data.name, 'Pascalcase')

    const getByName = await this.typesRepository.findByName(name.value)

    if (getByName) {
      const message = `Name ${name} already exists!`

      return left(new AlreadyExistsError(message))
    }

    const category = await this.categoriesRepository.findById(data.categoryId)

    if (!category) {
      return left(new NotFoundError())
    }

    const type = Type.create({
      name,
      SKUPrefix: data.SKUPrefix,
      categoryId: category.id,
      levels: new TypeLevelsList(),
      isActive: true,
    })

    await this.typesRepository.create(type)

    return right({
      type,
    })
  }
}
