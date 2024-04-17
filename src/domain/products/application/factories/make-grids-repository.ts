import { container, injectable } from 'tsyringe'
import { GridsRepository } from '../repositories/grids-repository'
import { NotImplementedError } from '@/core/errors/not-implemented-error'
import { InMemoryGridsRepository } from 'test/repositories/products/in-memory-grids-repository'

interface MakeGridsRepositoryProps {
  stage: 'in memory' | 'database'
}

@injectable()
export class MakeGridsRepository {
  static execute(props: MakeGridsRepositoryProps): GridsRepository {
    switch (props.stage) {
      case 'in memory': {
        const repository = container.resolve(InMemoryGridsRepository)

        container.registerInstance('GridsRepository', repository)

        return repository
      }

      case 'database': {
        container.register('GridsRepository', InMemoryGridsRepository)

        const repository = container.resolve(InMemoryGridsRepository)

        return repository
      }

      default: {
        throw new NotImplementedError()
      }
    }
  }
}
