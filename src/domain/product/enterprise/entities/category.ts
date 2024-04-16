import { Entity } from '@/core/entities/entity'
import { Name } from '../../../../core/entities/text'
import { CategoryTypesList } from './category-types-list'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface CategoryProps {
  name: Name
  isActive: boolean
  types: CategoryTypesList
  createdAt: Date
  updatedAt?: Date
}

export class Category extends Entity<CategoryProps> {
  get name() {
    return this.props.name
  }

  get isActive() {
    return this.props.isActive
  }

  get types() {
    return this.props.types
  }

  set name(value: Name) {
    this.props.name = value
    this.touch()
  }

  set isActive(value: boolean) {
    this.props.isActive = value
    this.touch()
  }

  set types(value: CategoryTypesList) {
    this.props.types = value
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<CategoryProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const category = new Category(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    )

    return category
  }
}
