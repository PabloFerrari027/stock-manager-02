import { Either, left, right } from '@/core/either'
import { User } from '../../../enterprise/entities/user'
import { inject, injectable } from 'tsyringe'
import { UsersRepository } from '../../repositories/users-repository'
import { NotFoundError } from '@/core/errors/not-found-error'
import { Text } from '@/core/entities/text'
import { DepartmentsRepository } from '../../repositories/departments-repository'
import { RolesRepository } from '../../repositories/roles-repository'

interface UpdateUserRequest {
  id: string
  name?: string
  departmentId?: string
  roleId?: string
}

type UpdateUserResponse = Either<
  NotFoundError,
  {
    user: User
  }
>

@injectable()
export class UpdateUser {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
    @inject('DepartmentsRepository')
    private departmentsRepository: DepartmentsRepository,
    @inject('RolesRepository')
    private rolesRepository: RolesRepository,
  ) {}

  async execute(data: UpdateUserRequest): Promise<UpdateUserResponse> {
    const user = await this.usersRepository.findById(data.id)

    if (!user) {
      return left(new NotFoundError())
    }

    if (data.name) user.name = Text.create(data.name, 'Pascalcase')

    const departmentId = data.departmentId

    if (departmentId) {
      const department = await this.departmentsRepository.findById(departmentId)

      if (!department) {
        return left(new NotFoundError())
      }

      user.departmentId = department.id
    }

    const roleId = data.roleId

    if (roleId) {
      const role = await this.rolesRepository.findById(roleId)

      if (!role) {
        return left(new NotFoundError())
      }

      user.roleId = role.id
    }

    await this.usersRepository.save(user)

    return right({
      user,
    })
  }
}
