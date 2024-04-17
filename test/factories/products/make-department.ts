import { Text } from '@/core/entities/text'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Department } from '@/domain/products/enterprise/entities/department'
import { faker } from '@faker-js/faker'

interface MakeDepartmentProps {
  name?: Text
  isActive?: boolean
  createdAt?: Date
}

export class makeDepartment {
  static execute(props: MakeDepartmentProps, id?: UniqueEntityID) {
    const name = props.name ?? Text.create(faker.company.name(), 'Pascalcase')

    const isActive = props.isActive ?? true

    const createdAt = props.createdAt

    const department = Department.create(
      {
        name,
        isActive,
        createdAt,
      },
      id,
    )

    return department
  }
}
