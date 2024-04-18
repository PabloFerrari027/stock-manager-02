import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { SKU } from '@/domain/products/enterprise/entities/SKU'
import { faker } from '@faker-js/faker'

interface MakeSKUProps {
  categoryId?: UniqueEntityID
  departmentId?: UniqueEntityID
  lineId?: UniqueEntityID
  prefix?: string
  sequential?: number
  size?: string
  variation?: number
  isActive?: boolean
  createdAt?: Date
}

export class makeSKU {
  static execute(props: MakeSKUProps, id?: UniqueEntityID) {
    const categoryId = props.categoryId ?? new UniqueEntityID()

    const departmentId = props.departmentId ?? new UniqueEntityID()

    const lineId = props.lineId ?? new UniqueEntityID()

    const prefix = props.prefix ?? faker.science.chemicalElement().symbol

    const sequential = props.sequential ?? 1

    const size = props.size ?? null

    const variation = props.variation ?? null

    const isActive = props.isActive ?? true

    const createdAt = props.createdAt

    const sku = SKU.create(
      {
        categoryId,
        departmentId,
        lineId,
        prefix,
        sequential,
        size,
        variation,
        isActive,
        createdAt,
      },
      id,
    )

    return sku
  }
}
