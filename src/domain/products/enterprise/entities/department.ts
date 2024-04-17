import { Entity } from '@/core/entities/entity'
import { Text } from '../../../../core/entities/text'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface DepartmentProps {
  name: Text
  isActive: boolean
  createdAt: Date
  updatedAt?: Date
}

export class Department extends Entity<DepartmentProps> {
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

  static create(
    props: Optional<DepartmentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const department = new Department(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    )
    return department
  }
}
