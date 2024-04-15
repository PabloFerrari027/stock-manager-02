import { Entity } from '@/core/entities/entity'
import { Name } from '@/core/entities/name'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface SupplierProps {
  code: string
  name: Name
  createdAt: Date
  updatedAt?: Date
}

export class Supplier extends Entity<SupplierProps> {
  get code() {
    return this.props.code
  }

  get name() {
    return this.props.name
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  set code(value: string) {
    this.props.code = value
    this.touch()
  }

  set name(value: Name) {
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
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )
    return supplier
  }
}
