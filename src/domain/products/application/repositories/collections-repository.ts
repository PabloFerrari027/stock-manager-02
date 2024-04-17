import { PaginationParams } from '@/core/types/pagination-params'
import { Collection } from '../../enterprise/entities/collection'
import { ListingResponse } from '@/core/types/listing-response'

export interface CollectionsRepository {
  create(data: Collection): Promise<void>
  save(data: Collection): Promise<void>
  findById(id: string): Promise<Collection | null>
  findByName(name: string): Promise<Collection | null>
  list(options: PaginationParams): Promise<ListingResponse<Collection>>
}
