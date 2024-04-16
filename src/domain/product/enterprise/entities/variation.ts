import { Entity } from '@/core/entities/entity'
import { VariationSKU } from './value-objects/variation-SKU'
import { Name } from '../../../../core/entities/text'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface VariationProps {
  name: Name
  variationSKU: VariationSKU
  isActive: boolean
  createdAt: Date
  updatedAt?: Date
}

export class Variation extends Entity<VariationProps> {
  get name() {
    return this.props.name
  }

  get SKU() {
    return this.props.variationSKU
  }

  get isActive() {
    return this.props.isActive
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  set name(value: Name) {
    this.props.name = value
    this.touch()
  }

  set isActive(value: boolean) {
    this.props.isActive = value
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<VariationProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const variation = new Variation(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    )
    return variation
  }
}
