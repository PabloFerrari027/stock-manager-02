import { PaginationParams } from '@/core/types/pagination-params'
import { FeedStock } from '../../enterprise/entities/feed-stock'
import { ListingResponse } from '@/core/types/listing-response'

export interface FeedStockRepository {
  create(data: FeedStock): Promise<void>
  save(data: FeedStock): Promise<void>
  findById(id: string): Promise<FeedStock | null>
  list(options: PaginationParams): Promise<ListingResponse<FeedStock>>
}
