import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Material, MaterialProps } from './material'
import { Optional } from '@/core/types/optional'

export interface FeedStockProps extends MaterialProps {}

export class FeedStock extends Material {
  static create(
    props: Optional<FeedStockProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const trim = new FeedStock(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    )
    return trim
  }
}
