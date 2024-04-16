import { Either, left, right } from '@/core/either'
import { User } from '../../../enterprise/entities/user'
import { Text } from '@/core/entities/text'
import { inject, injectable } from 'tsyringe'
import { UsersRepository } from '../../repositories/users-repository'
import { DepartmentsRepository } from '../../repositories/departments-repository'
import { NotFoundError } from '@/core/errors/not-found-error'
import { RolesRepository } from '../../repositories/roles-repository'
import { AlreadyExistsError } from '@/core/errors/already-exists-error'

interface CreateUserRequest {
  name: string
  authProvider: 'google'
  departmentId: string
  email: string
  roleId: string
}

type CreateUserResponse = Either<
  NotFoundError,
  {
    user: User
  }
>

@injectable()
export class CreateUser {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
    @inject('DepartmentsRepository')
    private departmentsRepository: DepartmentsRepository,
    @inject('RolesRepository')
    private rolesRepository: RolesRepository,
  ) {}

  async execute(data: CreateUserRequest): Promise<CreateUserResponse> {
    const email = data.email

    const getByEmail = await this.usersRepository.findByEmail(email)

    if (getByEmail) {
      const message = `Email ${email} already exists!`

      return left(new AlreadyExistsError(message))
    }

    const departmentId = data.departmentId

    const department = await this.departmentsRepository.findById(departmentId)

    if (!department) {
      return left(new NotFoundError())
    }

    const roleId = data.roleId

    const role = await this.rolesRepository.findById(roleId)

    if (!role) {
      return left(new NotFoundError())
    }

    const name = Text.create(data.name, 'Pascalcase')

    const authProvider = data.authProvider

    const user = User.create({
      name,
      authProvider,
      email,
      departmentId: department.id,
      roleId: role.id,
    })

    await this.usersRepository.create(user)

    return right({
      user,
    })
  }
}
