import { Text } from '@/core/entities/text'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User } from '@/domain/users/enterprise/entities/user'
import { faker } from '@faker-js/faker'

interface MakeUserProps {
  name?: Text
  authProvider?: 'google'
  email?: string
  departmentId?: UniqueEntityID
  roleId?: UniqueEntityID
  createdAt?: Date
}

export class makeUser {
  static execute(props: MakeUserProps, id?: UniqueEntityID) {
    const name = props.name ?? Text.create(faker.company.name(), 'Pascalcase')

    const authProvider = props.authProvider ?? 'google'

    const email = props.email ?? faker.internet.email()

    const departmentId = props.departmentId ?? new UniqueEntityID()

    const roleId = props.roleId ?? new UniqueEntityID()

    const createdAt = props.createdAt

    const user = User.create(
      {
        name,
        authProvider,
        departmentId,
        email,
        roleId,
        createdAt,
      },
      id,
    )

    return user
  }
}
