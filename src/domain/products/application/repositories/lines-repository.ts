import { PaginationParams } from '@/core/types/pagination-params'
import { Line } from '../../enterprise/entities/line'
import { ListingResponse } from '@/core/types/listing-response'

export interface LinesRepository {
  create(data: Line): Promise<void>
  save(data: Line): Promise<void>
  findById(id: string): Promise<Line | null>
  findByName(name: string): Promise<Line | null>
  list(options: PaginationParams): Promise<ListingResponse<Line>>
}
