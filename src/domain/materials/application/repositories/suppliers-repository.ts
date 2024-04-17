import { PaginationParams } from '@/core/types/pagination-params'
import { Supplier } from '../../enterprise/entities/supplier'
import { ListingResponse } from '@/core/types/listing-response'

export interface SuppliersRepository {
  create(data: Supplier): Promise<void>
  save(data: Supplier): Promise<void>
  findById(id: string): Promise<Supplier | null>
  list(options: PaginationParams): Promise<ListingResponse<Supplier>>
}
