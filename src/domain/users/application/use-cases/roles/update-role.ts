import { Either, left, right } from '@/core/either'
import { Role } from '../../../enterprise/entities/role'
import { inject, injectable } from 'tsyringe'
import { NotFoundError } from '@/core/errors/not-found-error'
import { Text } from '@/core/entities/text'
import { DepartmentsRepository } from '../../repositories/departments-repository'
import { RolesRepository } from '../../repositories/roles-repository'
import { AlreadyExistsError } from '@/core/errors/already-exists-error'

interface UpdateRoleRequest {
  id: string
  name?: string
  departmentId?: string
  permittedRoutes?: string[]
}

type UpdateRoleResponse = Either<
  NotFoundError | AlreadyExistsError,
  {
    role: Role
  }
>

@injectable()
export class UpdateRole {
  constructor(
    @inject('UsersDepartmentsRepository')
    private departmentsRepository: DepartmentsRepository,
    @inject('RolesRepository')
    private rolesRepository: RolesRepository,
  ) {}

  async execute(data: UpdateRoleRequest): Promise<UpdateRoleResponse> {
    const role = await this.rolesRepository.findById(data.id)

    if (!role) {
      return left(new NotFoundError())
    }

    if (data.name) {
      const name = Text.create(data.name, 'Pascalcase')

      const getByName = await this.rolesRepository.findByName(name.value)

      if (getByName) {
        const message = `Name ${name} already exists!`

        return left(new AlreadyExistsError(message))
      }

      role.name = name
    }

    const departmentId = data.departmentId

    if (departmentId) {
      const department = await this.departmentsRepository.findById(departmentId)

      if (!department) {
        return left(new NotFoundError())
      }

      role.departmentId = department.id
    }

    if (data.permittedRoutes) role.permittedRoutes = data.permittedRoutes

    await this.rolesRepository.save(role)

    return right({
      role,
    })
  }
}
