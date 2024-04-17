import { Either, left, right } from '@/core/either'
import { Category } from '../../../enterprise/entities/category'
import { inject, injectable } from 'tsyringe'
import { NotFoundError } from '@/core/errors/not-found-error'
import { Text } from '@/core/entities/text'
import { CategoriesRepository } from '../../repositories/categories-repository'
import { AlreadyExistsError } from '@/core/errors/already-exists-error'

interface UpdateCategoryRequest {
  id: string
  name?: string
}

type UpdateCategoryResponse = Either<
  NotFoundError | AlreadyExistsError,
  {
    category: Category
  }
>

@injectable()
export class UpdateCategory {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: CategoriesRepository,
  ) {}

  async execute(data: UpdateCategoryRequest): Promise<UpdateCategoryResponse> {
    const category = await this.categoriesRepository.findById(data.id)

    if (!category) {
      return left(new NotFoundError())
    }

    if (data.name) {
      const name = Text.create(data.name, 'Pascalcase')

      const getByName = await this.categoriesRepository.findByName(name.value)

      if (getByName) {
        const message = `Name ${name} already exists!`

        return left(new AlreadyExistsError(message))
      }

      category.name = name
    }

    await this.categoriesRepository.save(category)

    return right({
      category,
    })
  }
}
