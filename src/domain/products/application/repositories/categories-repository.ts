import { PaginationParams } from '@/core/types/pagination-params'
import { Category } from '../../enterprise/entities/category'
import { ListingResponse } from '@/core/types/listing-response'

export interface CategoriesRepository {
  create(data: Category): Promise<void>
  save(data: Category): Promise<void>
  findById(id: string): Promise<Category | null>
  findByName(name: string): Promise<Category | null>
  list(options: PaginationParams): Promise<ListingResponse<Category>>
}
