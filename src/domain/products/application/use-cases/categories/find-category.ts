import { Either, right } from '@/core/either'
import { Category } from '../../../enterprise/entities/category'
import { inject, injectable } from 'tsyringe'
import { CategoriesRepository } from '../../repositories/categories-repository'

interface FindCategoryRequest {
  id: string
}

type FindCategoryResponse = Either<
  null,
  {
    category: Category | null
  }
>

@injectable()
export class FindCategory {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: CategoriesRepository,
  ) {}

  async execute(data: FindCategoryRequest): Promise<FindCategoryResponse> {
    const category = await this.categoriesRepository.findById(data.id)

    return right({
      category,
    })
  }
}
