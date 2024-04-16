import { Either, right } from '@/core/either'
import { User } from '../../../enterprise/entities/user'
import { inject, injectable } from 'tsyringe'
import { UsersRepository } from '../../repositories/users-repository'
import { PaginationParams } from '@/core/types/pagination-params'
import { ListingResponse } from '@/core/types/listing-response'

interface ListUsersRequest extends PaginationParams {}

type ListUsersResponse = Either<null, ListingResponse<User>>

@injectable()
export class ListUsers {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  async execute(data: ListUsersRequest): Promise<ListUsersResponse> {
    const response = await this.usersRepository.list(data)

    return right(response)
  }
}
