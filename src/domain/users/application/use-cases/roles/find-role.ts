import { Either, right } from '@/core/either'
import { Role } from '../../../enterprise/entities/role'
import { inject, injectable } from 'tsyringe'
import { RolesRepository } from '../../repositories/roles-repository'

interface FindRoleRequest {
  id: string
}

type FindRoleResponse = Either<
  null,
  {
    role: Role | null
  }
>

@injectable()
export class FindRole {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: RolesRepository,
  ) {}

  async execute(data: FindRoleRequest): Promise<FindRoleResponse> {
    const role = await this.rolesRepository.findById(data.id)

    return right({
      role,
    })
  }
}
