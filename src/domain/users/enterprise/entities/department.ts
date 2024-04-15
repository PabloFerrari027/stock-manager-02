import { Entity } from '@/core/entities/entity'
import { Name } from '@/core/entities/name'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DepartmentRolesList } from './department-roles-list'
import { Optional } from '@/core/types/optional'

export interface DepartmentProps {
  name: Name
  roles: DepartmentRolesList
  createdAt: Date
  updatedAt?: Date
}

export class Department extends Entity<DepartmentProps> {
  get name() {
    return this.props.name
  }

  get roles() {
    return this.props.roles
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

  set roles(value: DepartmentRolesList) {
    this.props.roles = value
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
