import { Entity } from '@/core/entities/entity'
import { Text } from '../../../../core/entities/text'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface PreviewProps {
  name: Text
  departmentId: UniqueEntityID
  lineId: UniqueEntityID
  categoryId: UniqueEntityID
  typeId: UniqueEntityID
  gridId: UniqueEntityID
  variations: number
  isActive: boolean
  updatedAt?: Date
  createdAt: Date
}

export class Preview extends Entity<PreviewProps> {
  get name() {
    return this.props.name
  }

  get lineId() {
    return this.props.lineId
  }

  get categoryId() {
    return this.props.categoryId
  }

  get typeId() {
    return this.props.typeId
  }

  get departmentId() {
    return this.props.departmentId
  }

  get gridId() {
    return this.props.gridId
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

  set departmentId(value: UniqueEntityID) {
    this.props.departmentId = value
    this.touch()
  }

  set lineId(value: UniqueEntityID) {
    this.props.lineId = value
    this.touch()
  }

  set categoryId(value: UniqueEntityID) {
    this.props.categoryId = value
    this.touch()
  }

  set typeId(value: UniqueEntityID) {
    this.props.typeId = value
    this.touch()
  }

  set gridId(value: UniqueEntityID) {
    this.props.gridId = value
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
    props: Optional<PreviewProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const preview = new Preview(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    )
    return preview
  }
}
