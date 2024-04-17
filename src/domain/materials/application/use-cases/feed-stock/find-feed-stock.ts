import { Either, right } from '@/core/either'
import { FeedStock } from '../../../enterprise/entities/feed-stock'
import { inject, injectable } from 'tsyringe'
import { FeedStocksRepository } from '../../repositories/feed-stocks-repository'

interface FindFeedStockRequest {
  id: string
}

type FindFeedStockResponse = Either<
  null,
  {
    feedstock: FeedStock | null
  }
>

@injectable()
export class FindFeedStock {
  constructor(
    @inject('FeedStocksRepository')
    private feedstockRepository: FeedStocksRepository,
  ) {}

  async execute(data: FindFeedStockRequest): Promise<FindFeedStockResponse> {
    const feedstock = await this.feedstockRepository.findById(data.id)

    return right({
      feedstock,
    })
  }
}
