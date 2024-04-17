import { PaginationParams } from '@/core/types/pagination-params'
import { Grid } from '../../enterprise/entities/grid'
import { ListingResponse } from '@/core/types/listing-response'

export interface GridsRepository {
  create(data: Grid): Promise<void>
  save(data: Grid): Promise<void>
  findById(id: string): Promise<Grid | null>
  findByName(name: string): Promise<Grid | null>
  list(options: PaginationParams): Promise<ListingResponse<Grid>>
}
