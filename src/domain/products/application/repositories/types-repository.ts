import { PaginationParams } from '@/core/types/pagination-params'
import { Type } from '../../enterprise/entities/type'
import { ListingResponse } from '@/core/types/listing-response'

export interface TypesRepository {
  create(data: Type): Promise<void>
  save(data: Type): Promise<void>
  findById(id: string): Promise<Type | null>
  findByName(name: string): Promise<Type | null>
  list(options: PaginationParams): Promise<ListingResponse<Type>>
}
