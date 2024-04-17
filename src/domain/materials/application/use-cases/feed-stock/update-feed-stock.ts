import { Either, left, right } from '@/core/either'
import { FeedStock } from '../../../enterprise/entities/feed-stock'
import { inject, injectable } from 'tsyringe'
import { FeedStocksRepository } from '../../repositories/feed-stocks-repository'
import { NotFoundError } from '@/core/errors/not-found-error'
import { Text } from '@/core/entities/text'

interface UpdateFeedStockRequest {
  id: string
  name?: string
}

type UpdateFeedStockResponse = Either<
  NotFoundError,
  {
    feedStock: FeedStock
  }
>

@injectable()
export class UpdateFeedStock {
  constructor(
    @inject('FeedStocksRepository')
    private feedStockRepository: FeedStocksRepository,
  ) {}

  async execute(
    data: UpdateFeedStockRequest,
  ): Promise<UpdateFeedStockResponse> {
    const feedStock = await this.feedStockRepository.findById(data.id)

    if (!feedStock) {
      return left(new NotFoundError())
    }

    if (data.name) feedStock.name = Text.create(data.name, 'Pascalcase')

    await this.feedStockRepository.save(feedStock)

    return right({
      feedStock,
    })
  }
}
