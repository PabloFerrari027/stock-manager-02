import { Entity } from '@/core/entities/entity'
import { Text } from '../../../../core/entities/text'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface LevelProps {
  name: Text
  targetCost: number
  salePrice: number
  retailPrice: number
  multiBrandPrice: number
  isActive: boolean
  typeId: UniqueEntityID
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

  get typeId() {
    return this.props.typeId
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

  set targetCost(value: number) {
    this.props.targetCost = value
  }

  set salePrice(value: number) {
    this.props.salePrice = value
  }

  set retailPrice(value: number) {
    this.props.retailPrice = value
  }

  set multiBrandPrice(value: number) {
    this.props.multiBrandPrice = value
  }

  set isActive(value: boolean) {
    this.props.isActive = value
    this.touch()
  }

  set typeId(value: UniqueEntityID) {
    this.props.typeId = value
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
