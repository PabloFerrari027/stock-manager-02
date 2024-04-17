import { Text } from '@/core/entities/text'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Type } from '@/domain/products/enterprise/entities/type'
import { TypeLevelsList } from '@/domain/products/enterprise/entities/type-levels-list'
import { faker } from '@faker-js/faker'

interface MakeTypeProps {
  name?: Text
  categoryId?: UniqueEntityID
  isActive?: boolean
  levels?: TypeLevelsList
  createdAt?: Date
}

export class makeType {
  static execute(props: MakeTypeProps, id?: UniqueEntityID) {
    const name = props.name ?? Text.create(faker.company.name(), 'Pascalcase')

    const categoryId = props.categoryId ?? new UniqueEntityID()

    const isActive = props.isActive ?? true

    const levels = props.levels ?? new TypeLevelsList()

    const createdAt = props.createdAt

    const type = Type.create(
      {
        name,
        categoryId,
        isActive,
        levels,
        createdAt,
      },
      id,
    )

    return type
  }
}
