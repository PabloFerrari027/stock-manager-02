import { Entity } from '@/core/entities/entity'
import { Name } from '@/core/entities/name'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface UserProps {
  name: Name
  email: string
  authProvider: string
  departmentId: UniqueEntityID
  roleId: UniqueEntityID
  createdAt: Date
  updatedAt?: Date
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get authProvider() {
    return this.props.authProvider
  }

  get roleId() {
    return this.props.roleId
  }

  get departmentId() {
    return this.props.departmentId
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

  set email(value: string) {
    this.props.email = value
    this.touch()
  }

  set authProvider(value: string) {
    this.props.authProvider = value
    this.touch()
  }

  set roleId(value: UniqueEntityID) {
    this.props.roleId = value
    this.touch()
  }

  set departmentId(value: UniqueEntityID) {
    this.props.departmentId = value
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<UserProps, 'createdAt'>, id?: UniqueEntityID) {
    const user = new User(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    )
    return user
  }
}
