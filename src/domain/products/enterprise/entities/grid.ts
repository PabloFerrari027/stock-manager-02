import { Entity } from '@/core/entities/entity'
import { Text } from '../../../../core/entities/text'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface GridProps {
  name: Text
  isActive: boolean
  createdAt: Date
  updatedAt?: Date
}

export class Grid extends Entity<GridProps> {
  get name() {
    return this.props.name
  }

  get sizes() {
    const sizes = this.props.name.value.split('-')
    return sizes
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

  set name(value: Text) {
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

  static create(props: Optional<GridProps, 'createdAt'>, id?: UniqueEntityID) {
    const grid = new Grid(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    )
    return grid
  }
}
