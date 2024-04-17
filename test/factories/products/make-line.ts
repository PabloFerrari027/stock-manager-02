import { Text } from '@/core/entities/text'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Line } from '@/domain/products/enterprise/entities/line'
import { faker } from '@faker-js/faker'

interface MakeLineProps {
  name?: Text
  isActive?: boolean
  createdAt?: Date
}

export class makeLine {
  static execute(props: MakeLineProps, id?: UniqueEntityID) {
    const name = props.name ?? Text.create(faker.company.name(), 'Pascalcase')

    const isActive = props.isActive ?? true

    const createdAt = props.createdAt

    const line = Line.create(
      {
        name,
        isActive,
        createdAt,
      },
      id,
    )

    return line
  }
}
