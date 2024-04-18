import { PaginationParams } from '@/core/types/pagination-params'
import { ListingResponse } from '@/core/types/listing-response'
import { SKU } from '../../enterprise/entities/SKU'

export interface SKURepository {
  create(data: SKU): Promise<void>
  save(data: SKU): Promise<void>
  findById(id: string): Promise<SKU | null>
  findByValue(value: string): Promise<SKU | null>
  list(options: PaginationParams): Promise<ListingResponse<SKU>>
  listByType(
    id: string,
    options: PaginationParams,
  ): Promise<ListingResponse<SKU>>
}
