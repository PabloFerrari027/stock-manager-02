import { Text } from '@/core/entities/text'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Variation } from '@/domain/products/enterprise/entities/variation'
import { faker } from '@faker-js/faker'
import { VariationSKU } from '@/domain/products/enterprise/entities/value-objects/variation-SKU'

interface MakeVariationProps {
  name?: Text
  variationSKU?: VariationSKU
  isActive?: boolean
  createdAt?: Date
}

export class makeVariation {
  static execute(props: MakeVariationProps, id?: UniqueEntityID) {
    const name = props.name ?? Text.create(faker.company.name(), 'Pascalcase')

    const variationSKU =
      props.variationSKU ??
      VariationSKU.create({
        department: 'M',
        prefix: faker.science.chemicalElement().symbol,
        sequential: faker.number.int(),
        year,
      })

    const isActive = props.isActive ?? true

    const createdAt = props.createdAt

    const variation = Variation.create(
      {
        name,
        isActive,
        variationSKU,
        createdAt,
      },
      id,
    )

    return variation
  }
}
