import { container, injectable } from 'tsyringe'
import { TrimsRepository } from '../repositories/trims-repository'
import { NotImplementedError } from '@/core/errors/not-implemented-error'
import { InMemoryTrimsRepository } from 'test/repositories/in-memory-trims-repository'

interface MakeTrimsRepositoryProps {
  stage: 'in memory' | 'database'
}

@injectable()
export class MakeTrimsRepository {
  static execute(props: MakeTrimsRepositoryProps): TrimsRepository {
    switch (props.stage) {
      case 'in memory': {
        const repository = container.resolve(InMemoryTrimsRepository)

        container.registerInstance('TrimsRepository', repository)

        return repository
      }

      case 'database': {
        container.register('TrimsRepository', InMemoryTrimsRepository)

        const repository = container.resolve(InMemoryTrimsRepository)

        return repository
      }

      default: {
        throw new NotImplementedError()
      }
    }
  }
}
