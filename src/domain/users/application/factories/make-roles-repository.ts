import { container, injectable } from 'tsyringe'
import { RolesRepository } from '../repositories/roles-repository'
import { NotImplementedError } from '@/core/errors/not-implemented-error'
import { InMemoryRolesRepository } from 'test/repositories/in-memory-roles-repository'

interface MakeRolesRepositoryProps {
  stage: 'in memory' | 'database'
}

@injectable()
export class MakeRolesRepository {
  static execute(props: MakeRolesRepositoryProps): RolesRepository {
    switch (props.stage) {
      case 'in memory': {
        const repository = container.resolve(InMemoryRolesRepository)

        container.registerInstance('RolesRepository', repository)

        return repository
      }

      case 'database': {
        container.register('RolesRepository', InMemoryRolesRepository)

        const repository = container.resolve(InMemoryRolesRepository)

        return repository
      }

      default: {
        throw new NotImplementedError()
      }
    }
  }
}
