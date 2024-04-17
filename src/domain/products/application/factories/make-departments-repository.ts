import { container, injectable } from 'tsyringe'
import { DepartmentsRepository } from '../repositories/departments-repository'
import { NotImplementedError } from '@/core/errors/not-implemented-error'
import { InMemoryDepartmentsRepository } from 'test/repositories/products/in-memory-departments-repository'

interface MakeDepartmentsRepositoryProps {
  stage: 'in memory' | 'database'
}

@injectable()
export class MakeDepartmentsRepository {
  static execute(props: MakeDepartmentsRepositoryProps): DepartmentsRepository {
    switch (props.stage) {
      case 'in memory': {
        const repository = container.resolve(InMemoryDepartmentsRepository)

        container.registerInstance('ProductsDepartmentsRepository', repository)

        return repository
      }

      case 'database': {
        container.register(
          'ProductsDepartmentsRepository',
          InMemoryDepartmentsRepository,
        )

        const repository = container.resolve(InMemoryDepartmentsRepository)

        return repository
      }

      default: {
        throw new NotImplementedError()
      }
    }
  }
}
