import { Text } from '@/core/entities/text'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Category } from '@/domain/products/enterprise/entities/category'
import { CategoryTypesList } from '@/domain/products/enterprise/entities/category-types-list'
import { faker } from '@faker-js/faker'

interface MakeCategoryProps {
  name?: Text
  isActive?: boolean
  types?: CategoryTypesList
  createdAt?: Date
}

export class makeCategory {
  static execute(props: MakeCategoryProps, id?: UniqueEntityID) {
    const name = props.name ?? Text.create(faker.company.name(), 'Pascalcase')

    const isActive = props.isActive ?? true

    const types = props.types ?? new CategoryTypesList()

    const createdAt = props.createdAt

    const category = Category.create(
      {
        name,
        isActive,
        types,
        createdAt,
      },
      id,
    )

    return category
  }
}
