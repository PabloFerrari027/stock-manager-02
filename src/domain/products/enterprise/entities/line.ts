import { Entity } from '@/core/entities/entity'
import { Text } from '../../../../core/entities/text'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface LineProps {
  name: Text
  isActive: boolean
  createdAt: Date
  updatedAt?: Date
}

export class Line extends Entity<LineProps> {
  get name() {
    return this.props.name
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

  static create(props: Optional<LineProps, 'createdAt'>, id?: UniqueEntityID) {
    const line = new Line(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    )
    return line
  }
}
