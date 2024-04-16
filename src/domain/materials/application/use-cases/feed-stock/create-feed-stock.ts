import { Either, left, right } from '@/core/either'
import { FeedStock } from '../../../enterprise/entities/feed-stock'
import { Text } from '@/core/entities/text'
import { inject, injectable } from 'tsyringe'
import { FeedStockRepository } from '../../repositories/feed-stock-repository'
import { SuppliersRepository } from '../../repositories/supplier-repository'
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
    @inject('FeedStockRepository')
    private feedstockRepository: FeedStockRepository,
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
