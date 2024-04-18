import { PaginationParams } from '@/core/types/pagination-params'
import { Preview } from '../../enterprise/entities/preview'
import { ListingResponse } from '@/core/types/listing-response'

export interface PreviewsRepository {
  create(data: Preview): Promise<void>
  save(data: Preview): Promise<void>
  findById(id: string): Promise<Preview | null>
  list(options: PaginationParams): Promise<ListingResponse<Preview>>
}
