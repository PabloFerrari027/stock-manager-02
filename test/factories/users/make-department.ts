import { Text } from '@/core/entities/text'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Department } from '@/domain/users/enterprise/entities/department'
import { DepartmentRolesList } from '@/domain/users/enterprise/entities/department-roles-list'
import { faker } from '@faker-js/faker'

interface MakeDepartmentProps {
  name?: Text
  createdAt?: Date
  roles?: DepartmentRolesList
}

export class makeDepartment {
  static execute(props: MakeDepartmentProps, id?: UniqueEntityID) {
    const name = props.name ?? Text.create(faker.company.name(), 'Pascalcase')
    const roles = props.roles ?? new DepartmentRolesList([])
    const createdAt = props.createdAt

    const department = Department.create(
      {
        name,
        roles,
        createdAt,
      },
      id,
    )

    return department
  }
}
