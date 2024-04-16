import { Entity } from '@/core/entities/entity'
import { Text } from '@/core/entities/text'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface RoleProps {
  name: Text
  departmentId: UniqueEntityID
  permittedRoutes: string[]
  createdAt: Date
  updatedAt?: Date
}

export class Role extends Entity<RoleProps> {
  get name() {
    return this.props.name
  }

  get departmentId() {
    return this.props.departmentId
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

  set name(value: Text) {
    this.props.name = value
    this.touch()
  }

  set departmentId(value: UniqueEntityID) {
    this.props.departmentId = value
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
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    )
    return role
  }
}
