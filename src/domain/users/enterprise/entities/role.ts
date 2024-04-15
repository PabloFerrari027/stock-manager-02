import { Entity } from '@/core/entities/entity'
import { Name } from '@/core/entities/name'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface RoleProps {
  name: Name
  permittedRoutes: string[]
  createdAt: Date
  updatedAt?: Date
}

export class Role extends Entity<RoleProps> {
  get name() {
    return this.props.name
  }

  get permittedRoutes() {
    return this.props.permittedRoutes
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

  set permittedRoutes(value: string[]) {
    this.props.permittedRoutes = value
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<RoleProps, 'createdAt'>, id?: UniqueEntityID) {
    const role = new Role(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )
    return role
  }
}
