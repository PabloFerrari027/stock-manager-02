import { Either, right } from '@/core/either'
import { User } from '../../../enterprise/entities/user'
import { inject, injectable } from 'tsyringe'
import { UsersRepository } from '../../repositories/users-repository'

interface FindUserRequest {
  id: string
}

type FindUserResponse = Either<
  null,
  {
    user: User | null
  }
>

@injectable()
export class FindUser {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  async execute(data: FindUserRequest): Promise<FindUserResponse> {
    const user = await this.usersRepository.findById(data.id)

    return right({
      user,
    })
  }
}
