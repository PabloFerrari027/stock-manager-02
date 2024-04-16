import { container, injectable } from 'tsyringe'
import { FeedStockRepository } from '../repositories/feed-stock-repository'
import { NotImplementedError } from '@/core/errors/not-implemented-error'
import { InMemoryFeedStockRepository } from 'test/repositories/in-memory-feed-stock-repository'

interface MakeFeedStockRepositoryProps {
  stage: 'in memory' | 'database'
}

@injectable()
export class MakeFeedStockRepository {
  static execute(props: MakeFeedStockRepositoryProps): FeedStockRepository {
    switch (props.stage) {
      case 'in memory': {
        const repository = container.resolve(InMemoryFeedStockRepository)

        container.registerInstance('FeedStockRepository', repository)

        return repository
      }

      case 'database': {
        container.register('FeedStockRepository', InMemoryFeedStockRepository)

        const repository = container.resolve(InMemoryFeedStockRepository)

        return repository
      }

      default: {
        throw new NotImplementedError()
      }
    }
  }
}
