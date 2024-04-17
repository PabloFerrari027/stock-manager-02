import { Text } from '@/core/entities/text'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Grid } from '@/domain/products/enterprise/entities/grid'
import { faker } from '@faker-js/faker'

interface MakeGridProps {
  name?: Text
  isActive?: boolean
  createdAt?: Date
}

export class makeGrid {
  static execute(props: MakeGridProps, id?: UniqueEntityID) {
    const name = props.name ?? Text.create(faker.company.name(), 'Pascalcase')

    const isActive = props.isActive ?? true

    const createdAt = props.createdAt

    const grid = Grid.create(
      {
        name,
        isActive,
        createdAt,
      },
      id,
    )

    return grid
  }
}
