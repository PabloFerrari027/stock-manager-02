import { Entity } from '@/core/entities/entity'
import { Name } from '../../../../core/entities/text'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface LevelProps {
  name: Name
  targetCost: number
  salePrice: number
  retailPrice: number
  multiBrandPrice: number
  isActive: boolean
  createdAt: Date
  updatedAt?: Date
}

export class Level extends Entity<LevelProps> {
  get name() {
    return this.props.name
  }

  get targetCost() {
    return this.props.targetCost
  }

  get salePrice() {
    return this.props.salePrice
  }

  get retailPrice() {
    return this.props.retailPrice
  }

  get multiBrandPrice() {
    return this.props.multiBrandPrice
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

  static create(props: Optional<LevelProps, 'createdAt'>, id?: UniqueEntityID) {
    const level = new Level(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    )
    return level
  }
}
