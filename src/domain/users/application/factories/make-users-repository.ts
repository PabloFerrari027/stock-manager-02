import { container, injectable } from 'tsyringe'
import { UsersRepository } from '../repositories/users-repository'
import { NotImplementedError } from '@/core/errors/not-implemented-error'
import { InMemoryUsersRepository } from 'test/repositories/users/in-memory-users-repository'

interface MakeUsersRepositoryProps {
  stage: 'in memory' | 'database'
}

@injectable()
export class MakeUsersRepository {
  static execute(props: MakeUsersRepositoryProps): UsersRepository {
    switch (props.stage) {
      case 'in memory': {
        const repository = container.resolve(InMemoryUsersRepository)

        container.registerInstance('UsersRepository', repository)

        return repository
      }

      case 'database': {
        container.register('UsersRepository', InMemoryUsersRepository)

        const repository = container.resolve(InMemoryUsersRepository)

        return repository
      }

      default: {
        throw new NotImplementedError()
      }
    }
  }
}
