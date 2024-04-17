import { Text } from '@/core/entities/text'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Level } from '@/domain/products/enterprise/entities/level'
import { faker } from '@faker-js/faker'

interface MakeLevelProps {
  name?: Text
  typeId?: UniqueEntityID
  isActive?: boolean
  multiBrandPrice?: number
  retailPrice?: number
  salePrice?: number
  targetCost?: number
  createdAt?: Date
}

export class makeLevel {
  static execute(props: MakeLevelProps, id?: UniqueEntityID) {
    const name = props.name ?? Text.create(faker.company.name(), 'Pascalcase')

    const typeId = props.typeId ?? new UniqueEntityID()

    const isActive = props.isActive ?? true

    const multiBrandPrice = props.multiBrandPrice ?? faker.number.float()

    const retailPrice = props.retailPrice ?? faker.number.float()

    const salePrice = props.salePrice ?? faker.number.float()

    const targetCost = props.targetCost ?? faker.number.float()

    const createdAt = props.createdAt

    const level = Level.create(
      {
        name,
        typeId,
        isActive,
        multiBrandPrice,
        retailPrice,
        salePrice,
        targetCost,
        createdAt,
      },
      id,
    )

    return level
  }
}
