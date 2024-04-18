import { Text } from '@/core/entities/text'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { SKU } from '@/domain/products/enterprise/entities/SKU'
import { Variation } from '@/domain/products/enterprise/entities/variation'
import { faker } from '@faker-js/faker'

interface MakeVariationProps {
  name?: Text
  SKU?: SKU
  isActive?: boolean
  createdAt?: Date
}

export class makeVariation {
  static execute(props: MakeVariationProps, id?: UniqueEntityID) {
    const name = props.name ?? Text.create(faker.company.name(), 'Pascalcase')

    const sku =
      props.SKU ??
      SKU.create({
        categoryId: new UniqueEntityID(),
        departmentId: new UniqueEntityID(),
        lineId: new UniqueEntityID(),
        prefix: faker.science.chemicalElement().symbol,
        sequential: faker.number.int(),
      })

    const isActive = props.isActive ?? true

    const createdAt = props.createdAt

    const variation = Variation.create(
      {
        name,
        isActive,
        SKU: sku,
        createdAt,
      },
      id,
    )

    return variation
  }
}
