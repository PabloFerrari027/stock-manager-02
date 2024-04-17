import { container, injectable } from 'tsyringe'
import { VariationsRepository } from '../repositories/variations-repository'
import { NotImplementedError } from '@/core/errors/not-implemented-error'
import { InMemoryVariationsRepository } from 'test/repositories/products/in-memory-variations-repository'

interface MakeVariationsRepositoryProps {
  stage: 'in memory' | 'database'
}

@injectable()
export class MakeVariationsRepository {
  static execute(props: MakeVariationsRepositoryProps): VariationsRepository {
    switch (props.stage) {
      case 'in memory': {
        const repository = container.resolve(InMemoryVariationsRepository)

        container.registerInstance('VariationsRepository', repository)

        return repository
      }

      case 'database': {
        container.register('VariationsRepository', InMemoryVariationsRepository)

        const repository = container.resolve(InMemoryVariationsRepository)

        return repository
      }

      default: {
        throw new NotImplementedError()
      }
    }
  }
}
