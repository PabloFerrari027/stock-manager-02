import { Either, right } from '@/core/either'
import { Role } from '../../../enterprise/entities/role'
import { inject, injectable } from 'tsyringe'
import { RolesRepository } from '../../repositories/roles-repository'
import { PaginationParams } from '@/core/types/pagination-params'
import { ListingResponse } from '@/core/types/listing-response'

interface ListRolesRequest extends PaginationParams {}

type ListRolesResponse = Either<null, ListingResponse<Role>>

@injectable()
export class ListRoles {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: RolesRepository,
  ) {}

  async execute(data: ListRolesRequest): Promise<ListRolesResponse> {
    const response = await this.rolesRepository.list(data)

    return right(response)
  }
}
