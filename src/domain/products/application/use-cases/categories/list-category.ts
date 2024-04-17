import { Either, right } from '@/core/either'
import { Category } from '../../../enterprise/entities/category'
import { inject, injectable } from 'tsyringe'
import { CategoriesRepository } from '../../repositories/categories-repository'
import { PaginationParams } from '@/core/types/pagination-params'
import { ListingResponse } from '@/core/types/listing-response'

interface ListCategoriesRequest extends PaginationParams {}

type ListCategoriesResponse = Either<null, ListingResponse<Category>>

@injectable()
export class ListCategories {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: CategoriesRepository,
  ) {}

  async execute(data: ListCategoriesRequest): Promise<ListCategoriesResponse> {
    const response = await this.categoriesRepository.list(data)

    return right(response)
  }
}
