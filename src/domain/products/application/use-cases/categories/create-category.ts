import { Either, left, right } from '@/core/either'
import { Category } from '../../../enterprise/entities/category'
import { Text } from '@/core/entities/text'
import { inject, injectable } from 'tsyringe'
import { NotFoundError } from '@/core/errors/not-found-error'
import { CategoriesRepository } from '../../repositories/categories-repository'
import { AlreadyExistsError } from '@/core/errors/already-exists-error'
import { CategoryTypesList } from '@/domain/products/enterprise/entities/category-types-list'

interface CreateCategoryRequest {
  name: string
}

type CreateCategoryResponse = Either<
  NotFoundError,
  {
    category: Category
  }
>

@injectable()
export class CreateCategory {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: CategoriesRepository,
  ) {}

  async execute(data: CreateCategoryRequest): Promise<CreateCategoryResponse> {
    const name = Text.create(data.name, 'Pascalcase')

    const getByName = await this.categoriesRepository.findByName(name.value)

    if (getByName) {
      const message = `Name ${name} already exists!`

      return left(new AlreadyExistsError(message))
    }

    const category = Category.create({
      name,
      isActive: true,
      types: new CategoryTypesList(),
    })

    await this.categoriesRepository.create(category)

    return right({
      category,
    })
  }
}
