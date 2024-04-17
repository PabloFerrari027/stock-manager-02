import { container, injectable } from 'tsyringe'
import { SuppliersRepository } from '../repositories/suppliers-repository'
import { NotImplementedError } from '@/core/errors/not-implemented-error'
import { InMemorySuppliersRepository } from 'test/repositories/materials/in-memory-suppliers-repository'

interface MakeSuppliersRepositoryProps {
  stage: 'in memory' | 'database'
}

@injectable()
export class MakeSuppliersRepository {
  static execute(props: MakeSuppliersRepositoryProps): SuppliersRepository {
    switch (props.stage) {
      case 'in memory': {
        const repository = container.resolve(InMemorySuppliersRepository)

        container.registerInstance('SuppliersRepository', repository)

        return repository
      }

      case 'database': {
        container.register('SuppliersRepository', InMemorySuppliersRepository)

        const repository = container.resolve(InMemorySuppliersRepository)

        return repository
      }

      default: {
        throw new NotImplementedError()
      }
    }
  }
}
