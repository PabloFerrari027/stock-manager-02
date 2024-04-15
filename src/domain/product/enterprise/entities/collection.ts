import { Entity } from '@/core/entities/entity'
import { Name } from '../../../../core/entities/name'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface CollectionProps {
  name: Name
  isActive: boolean
  createdAt: Date
  updatedAt?: Date
}

export class Collection extends Entity<CollectionProps> {
  get name() {
    return this.props.name
  }

  get isActive() {
    return this.props.isActive
  }

  set name(value: Name) {
    this.props.name = value
    this.touch()
  }

  set isActive(value: boolean) {
    this.props.isActive = value
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<CollectionProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const collection = new Collection(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )
    return collection
  }
}
