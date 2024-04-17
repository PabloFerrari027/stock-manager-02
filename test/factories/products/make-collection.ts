import { Text } from '@/core/entities/text'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Collection } from '@/domain/products/enterprise/entities/collection'
import { faker } from '@faker-js/faker'

interface MakeCollectionProps {
  name?: Text
  isActive?: boolean
  createdAt?: Date
}

export class makeCollection {
  static execute(props: MakeCollectionProps, id?: UniqueEntityID) {
    const name = props.name ?? Text.create(faker.company.name(), 'Pascalcase')

    const isActive = props.isActive ?? true

    const createdAt = props.createdAt

    const collection = Collection.create(
      {
        name,
        isActive,
        createdAt,
      },
      id,
    )

    return collection
  }
}
