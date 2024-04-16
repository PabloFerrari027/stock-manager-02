import { Entity } from '@/core/entities/entity'
import { Text } from '@/core/entities/text'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface MaterialProps {
  name: Text
  unit: Text
  supplierId: UniqueEntityID
  createdAt: Date
  updatedAt?: Date
}

export class Material extends Entity<MaterialProps> {
  get name() {
    return this.props.name
  }

  get unit() {
    return this.props.unit
  }

  get supplierId() {
    return this.props.supplierId
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

  set unit(value: Text) {
    this.props.unit = value
    this.touch()
  }

  set supplierId(value: UniqueEntityID) {
    this.props.supplierId = value
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<MaterialProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const material = new Material(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    )
    return material
  }
}
