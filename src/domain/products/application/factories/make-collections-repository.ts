import { container, injectable } from 'tsyringe'
import { CollectionsRepository } from '../repositories/collections-repository'
import { NotImplementedError } from '@/core/errors/not-implemented-error'
import { InMemoryCollectionsRepository } from 'test/repositories/products/in-memory-collections-repository'

interface MakeCollectionsRepositoryProps {
  stage: 'in memory' | 'database'
}

@injectable()
export class MakeCollectionsRepository {
  static execute(props: MakeCollectionsRepositoryProps): CollectionsRepository {
    switch (props.stage) {
      case 'in memory': {
        const repository = container.resolve(InMemoryCollectionsRepository)

        container.registerInstance('CollectionsRepository', repository)

        return repository
      }

      case 'database': {
        container.register(
          'CollectionsRepository',
          InMemoryCollectionsRepository,
        )

        const repository = container.resolve(InMemoryCollectionsRepository)

        return repository
      }

      default: {
        throw new NotImplementedError()
      }
    }
  }
}
