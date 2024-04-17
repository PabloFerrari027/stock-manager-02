import { Text } from '@/core/entities/text'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Role } from '@/domain/users/enterprise/entities/role'
import { faker } from '@faker-js/faker'

interface MakeRoleProps {
  name?: Text
  departmentId?: UniqueEntityID
  permittedRoutes?: string[]
  createdAt?: Date
}

export class makeRole {
  static execute(props: MakeRoleProps, id?: UniqueEntityID) {
    const name = props.name ?? Text.create(faker.company.name(), 'Pascalcase')
    const departmentId = props.departmentId ?? new UniqueEntityID()
    const permittedRoutes = props.permittedRoutes ?? []
    const createdAt = props.createdAt

    const role = Role.create(
      {
        name,
        departmentId,
        permittedRoutes,
        createdAt,
      },
      id,
    )

    return role
  }
}
