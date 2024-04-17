import { Text } from '@/core/entities/text'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { FeedStock } from '@/domain/materials/enterprise/entities/feed-stock'
import { faker } from '@faker-js/faker'

interface MakeFeedStockProps {
  name?: Text
  supplierId?: UniqueEntityID
  unit?: string
  createdAt?: Date
  updatedAt?: Date
}

export class makeFeedStock {
  static execute(props: MakeFeedStockProps, id?: UniqueEntityID) {
    const name = props.name ?? Text.create(faker.company.name(), 'Pascalcase')

    const supplierId = props.supplierId ?? new UniqueEntityID()

    const unit = Text.create(
      props.unit ?? faker.science.unit().symbol,
      'Uppercase',
    )

    const updatedAt = props.updatedAt

    const createdAt = props.createdAt

    const feedStock = FeedStock.create(
      {
        name,
        supplierId,
        unit,
        updatedAt,
        createdAt,
      },
      id,
    )

    return feedStock
  }
}
