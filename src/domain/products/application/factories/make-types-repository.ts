import { container, injectable } from 'tsyringe'
import { TypesRepository } from '../repositories/types-repository'
import { NotImplementedError } from '@/core/errors/not-implemented-error'
import { InMemoryTypesRepository } from 'test/repositories/products/in-memory-types-repository'

interface MakeTypesRepositoryProps {
  stage: 'in memory' | 'database'
}

@injectable()
export class MakeTypesRepository {
  static execute(props: MakeTypesRepositoryProps): TypesRepository {
    switch (props.stage) {
      case 'in memory': {
        const repository = container.resolve(InMemoryTypesRepository)

        container.registerInstance('TypesRepository', repository)

        return repository
      }

      case 'database': {
        container.register('TypesRepository', InMemoryTypesRepository)

        const repository = container.resolve(InMemoryTypesRepository)

        return repository
      }

      default: {
        throw new NotImplementedError()
      }
    }
  }
}
