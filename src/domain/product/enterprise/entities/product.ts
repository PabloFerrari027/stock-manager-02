import { Entity } from '@/core/entities/entity'
import { SKU } from './value-objects/SKU'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ProductVariationsList } from './product-variations-list'
import { Name } from '../../../../core/entities/text'
import { Cover } from './cover'
import { ProductCollectionsList } from './product-collections-list'
import { ProductTrimsList } from './product-trims-list'
import { ProductFeedStoksList } from './product-feed-stocks-list'
import { ProductAttachmentsList } from './product-attachments-list'
import { Optional } from '@/core/types/optional'

export interface ProductProps {
  name: Name
  SKU: SKU
  isActive: boolean
  departmentId: UniqueEntityID
  lineId: UniqueEntityID
  categoryId: UniqueEntityID
  typeId: UniqueEntityID
  gridId: UniqueEntityID
  levelId: UniqueEntityID
  cover: Cover
  attachments: ProductAttachmentsList
  trims: ProductTrimsList
  feedStocks: ProductFeedStoksList
  variations: ProductVariationsList
  collections: ProductCollectionsList
  createdAt: Date
  updatedAt?: Date
}

export class Product extends Entity<ProductProps> {
  get name() {
    return this.props.name
  }

  get SKU(): SKU {
    return this.props.SKU
  }

  get feedStocks() {
    return this.props.feedStocks
  }

  get trims() {
    return this.props.trims
  }

  get variations() {
    return this.props.variations
  }

  get isActive() {
    return this.props.isActive
  }

  get lineId() {
    return this.props.lineId
  }

  get collections() {
    return this.props.collections
  }

  get departmentId() {
    return this.props.departmentId
  }

  get categoryId() {
    return this.props.categoryId
  }

  get typeId() {
    return this.props.typeId
  }

  get gridId() {
    return this.props.gridId
  }

  get levelId() {
    return this.props.levelId
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

  set feedStocks(value: ProductFeedStoksList) {
    this.props.feedStocks = value
    this.touch()
  }

  set trims(value: ProductTrimsList) {
    this.props.trims = value
    this.touch()
  }

  set variations(value: ProductVariationsList) {
    this.props.variations = value
    this.touch()
  }

  set isActive(value: boolean) {
    this.props.isActive = value
  }

  set lineId(value: UniqueEntityID) {
    this.props.lineId = value
    this.touch()
  }

  set collections(value: ProductCollectionsList) {
    this.props.collections = value
    this.touch()
  }

  set departmentId(value: UniqueEntityID) {
    this.props.departmentId = value
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

  set levelId(value: UniqueEntityID) {
    this.props.levelId = value
    this.touch()
  }

  set createdAt(value: Date) {
    this.props.createdAt = value
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<ProductProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const product = new Product(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    )
    return product
  }
}
