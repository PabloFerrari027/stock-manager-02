import { container, injectable } from 'tsyringe'
import { LevelsRepository } from '../repositories/levels-repository'
import { NotImplementedError } from '@/core/errors/not-implemented-error'
import { InMemoryLevelsRepository } from 'test/repositories/products/in-memory-levels-repository'

interface MakeLevelsRepositoryProps {
  stage: 'in memory' | 'database'
}

@injectable()
export class MakeLevelsRepository {
  static execute(props: MakeLevelsRepositoryProps): LevelsRepository {
    switch (props.stage) {
      case 'in memory': {
        const repository = container.resolve(InMemoryLevelsRepository)

        container.registerInstance('LevelsRepository', repository)

        return repository
      }

      case 'database': {
        container.register('LevelsRepository', InMemoryLevelsRepository)

        const repository = container.resolve(InMemoryLevelsRepository)

        return repository
      }

      default: {
        throw new NotImplementedError()
      }
    }
  }
}
