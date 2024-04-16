import { PaginationParams } from '@/core/types/pagination-params'
import { Trims } from '../../enterprise/entities/trims'
import { ListingResponse } from '@/core/types/listing-response'

export interface TrimsRepository {
  create(data: Trims): Promise<void>
  save(data: Trims): Promise<void>
  findById(id: string): Promise<Trims | null>
  list(options: PaginationParams): Promise<ListingResponse<Trims>>
}
