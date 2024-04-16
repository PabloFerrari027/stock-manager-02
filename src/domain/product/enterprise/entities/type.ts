import { Entity } from '@/core/entities/entity'
import { Name } from '../../../../core/entities/text'
import { TypeLevelsList } from './type-levels-list'
import { Optional } from '@/core/types/optional'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface TypeProps {
  name: Name
  isActive: boolean
  levels: TypeLevelsList
  createdAt: Date
  updatedAt?: Date
}

export class Type extends Entity<TypeProps> {
  get name() {
    return this.props.name
  }

  get isActive() {
    return this.props.isActive
  }

  get levels() {
    return this.props.levels
  }

  set name(value: Name) {
    this.props.name = value
    this.touch()
  }

  set isActive(value: boolean) {
    this.props.isActive = value
    this.touch()
  }

  set levels(value: TypeLevelsList) {
    this.props.levels = value
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<TypeProps, 'createdAt'>, id?: UniqueEntityID) {
    const type = new Type(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    )
    return type
  }
}
