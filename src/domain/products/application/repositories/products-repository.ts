import { PaginationParams } from '@/core/types/pagination-params'
import { Product } from '../../enterprise/entities/product'
import { ListingResponse } from '@/core/types/listing-response'

export interface ProductsRepository {
  create(data: Product): Promise<void>
  save(data: Product): Promise<void>
  findById(id: string): Promise<Product | null>
  findBySKU(SKU: string): Promise<Product | null>
  list(options: PaginationParams): Promise<ListingResponse<Product>>
  listByType(
    id: string,
    options: PaginationParams,
  ): Promise<ListingResponse<Product>>
}
