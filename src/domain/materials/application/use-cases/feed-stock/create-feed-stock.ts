import { Either, left, right } from '@/core/either'
import { FeedStock } from '../../../enterprise/entities/feed-stock'
import { Text } from '@/core/entities/text'
import { inject, injectable } from 'tsyringe'
import { FeedStocksRepository } from '../../repositories/feed-stocks-repository'
import { SuppliersRepository } from '../../repositories/suppliers-repository'
import { NotFoundError } from '@/core/errors/not-found-error'

interface CreateFeedStockRequest {
  name: string
  supplierId: string
  unit: string
}

type CreateFeedStockResponse = Either<
  NotFoundError,
  {
    feedstock: FeedStock
  }
>

@injectable()
export class CreateFeedStock {
  constructor(
    @inject('FeedStocksRepository')
    private feedstockRepository: FeedStocksRepository,
    @inject('SuppliersRepository')
    private suppliersRepository: SuppliersRepository,
  ) {}

  async execute(
    data: CreateFeedStockRequest,
  ): Promise<CreateFeedStockResponse> {
    const name = Text.create(data.name, 'Pascalcase')

    const supplier = await this.suppliersRepository.findById(data.supplierId)

    if (!supplier) {
      return left(new NotFoundError())
    }

    const unit = Text.create(data.unit, 'Uppercase')

    const feedstock = FeedStock.create({
      name,
      supplierId: supplier.id,
      unit,
    })

    await this.feedstockRepository.create(feedstock)

    return right({
      feedstock,
    })
  }
}
