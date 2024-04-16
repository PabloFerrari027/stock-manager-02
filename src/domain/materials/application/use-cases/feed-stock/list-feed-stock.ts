import { Either, right } from '@/core/either'
import { FeedStock } from '../../../enterprise/entities/feed-stock'
import { inject, injectable } from 'tsyringe'
import { FeedStockRepository } from '../../repositories/feed-stock-repository'
import { PaginationParams } from '@/core/types/pagination-params'
import { ListingResponse } from '@/core/types/listing-response'

interface ListFeedStockRequest extends PaginationParams {}

type ListFeedStockResponse = Either<null, ListingResponse<FeedStock>>

@injectable()
export class ListFeedStock {
  constructor(
    @inject('FeedStockRepository')
    private feedstockRepository: FeedStockRepository,
  ) {}

  async execute(data: ListFeedStockRequest): Promise<ListFeedStockResponse> {
    const response = await this.feedstockRepository.list(data)

    return right(response)
  }
}
