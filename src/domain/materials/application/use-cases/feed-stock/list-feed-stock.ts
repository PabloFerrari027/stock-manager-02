import { Either, right } from '@/core/either'
import { FeedStock } from '../../../enterprise/entities/feed-stock'
import { inject, injectable } from 'tsyringe'
import { FeedStocksRepository } from '../../repositories/feed-stocks-repository'
import { PaginationParams } from '@/core/types/pagination-params'
import { ListingResponse } from '@/core/types/listing-response'

interface ListFeedStockRequest extends PaginationParams {}

type ListFeedStockResponse = Either<null, ListingResponse<FeedStock>>

@injectable()
export class ListFeedStock {
  constructor(
    @inject('FeedStocksRepository')
    private feedstockRepository: FeedStocksRepository,
  ) {}

  async execute(data: ListFeedStockRequest): Promise<ListFeedStockResponse> {
    const response = await this.feedstockRepository.list(data)

    return right(response)
  }
}
