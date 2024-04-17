import { container, injectable } from 'tsyringe'
import { LinesRepository } from '../repositories/lines-repository'
import { NotImplementedError } from '@/core/errors/not-implemented-error'
import { InMemoryLinesRepository } from 'test/repositories/products/in-memory-lines-repository'

interface MakeLinesRepositoryProps {
  stage: 'in memory' | 'database'
}

@injectable()
export class MakeLinesRepository {
  static execute(props: MakeLinesRepositoryProps): LinesRepository {
    switch (props.stage) {
      case 'in memory': {
        const repository = container.resolve(InMemoryLinesRepository)

        container.registerInstance('LinesRepository', repository)

        return repository
      }

      case 'database': {
        container.register('LinesRepository', InMemoryLinesRepository)

        const repository = container.resolve(InMemoryLinesRepository)

        return repository
      }

      default: {
        throw new NotImplementedError()
      }
    }
  }
}
