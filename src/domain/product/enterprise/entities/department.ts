import { Entity } from '@/core/entities/entity'
import { Name } from '../../../../core/entities/name'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface DepartmentProps {
  name: Name
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
    props: Optional<DepartmentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const department = new Department(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )
    return department
  }
}