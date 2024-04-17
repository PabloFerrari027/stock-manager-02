import { container, injectable } from 'tsyringe'
import { FeedStocksRepository } from '../repositories/feed-stocks-repository'
import { NotImplementedError } from '@/core/errors/not-implemented-error'
import { InMemoryFeedStocksRepository } from 'test/repositories/materials/in-memory-feed-stocks-repository'

interface MakeFeedStocksRepositoryProps {
  stage: 'in memory' | 'database'
}

@injectable()
export class MakeFeedStocksRepository {
  static execute(props: MakeFeedStocksRepositoryProps): FeedStocksRepository {
    switch (props.stage) {
      case 'in memory': {
        const repository = container.resolve(InMemoryFeedStocksRepository)

        container.registerInstance('FeedStocksRepository', repository)

        return repository
      }

      case 'database': {
        container.register('FeedStocksRepository', InMemoryFeedStocksRepository)

        const repository = container.resolve(InMemoryFeedStocksRepository)

        return repository
      }

      default: {
        throw new NotImplementedError()
      }
    }
  }
}
