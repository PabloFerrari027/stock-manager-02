import { Either, left, right } from '@/core/either'
import { Role } from '../../../enterprise/entities/role'
import { Text } from '@/core/entities/text'
import { inject, injectable } from 'tsyringe'
import { DepartmentsRepository } from '../../repositories/departments-repository'
import { NotFoundError } from '@/core/errors/not-found-error'
import { RolesRepository } from '../../repositories/roles-repository'
import { AlreadyExistsError } from '@/core/errors/already-exists-error'

interface CreateRoleRequest {
  name: string
  departmentId: string
  permittedRoutes: string[]
}

type CreateRoleResponse = Either<
  NotFoundError,
  {
    role: Role
  }
>

@injectable()
export class CreateRole {
  constructor(
    @inject('UsersDepartmentsRepository')
    private departmentsRepository: DepartmentsRepository,
    @inject('RolesRepository')
    private rolesRepository: RolesRepository,
  ) {}

  async execute(data: CreateRoleRequest): Promise<CreateRoleResponse> {
    const name = Text.create(data.name, 'Pascalcase')

    const getByName = await this.rolesRepository.findByName(name.value)

    if (getByName) {
      const message = `Name ${name} already exists!`

      return left(new AlreadyExistsError(message))
    }

    const departmentId = data.departmentId

    const department = await this.departmentsRepository.findById(departmentId)

    if (!department) {
      return left(new NotFoundError())
    }

    const role = Role.create({
      name,
      departmentId: department.id,
      permittedRoutes: data.permittedRoutes,
    })

    await this.rolesRepository.create(role)

    return right({
      role,
    })
  }
}
