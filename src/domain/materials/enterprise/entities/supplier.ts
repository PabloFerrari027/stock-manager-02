import { Entity } from '@/core/entities/entity'
import { Text } from '@/core/entities/text'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface SupplierProps {
  name: Text
  createdAt: Date
  updatedAt?: Date
}

export class Supplier extends Entity<SupplierProps> {
  get name() {
    return this.props.name
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  set name(value: Text) {
    this.props.name = value
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<SupplierProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const supplier = new Supplier(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    )
    return supplier
  }
}
