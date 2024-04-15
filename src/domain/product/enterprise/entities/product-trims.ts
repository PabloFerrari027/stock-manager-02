import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface ProductTrimsProps {
  productId: UniqueEntityID
  trimsId: UniqueEntityID
}

export class ProductTrims extends Entity<ProductTrimsProps> {
  get productId() {
    return this.props.productId
  }

  get trimsId() {
    return this.props.trimsId
  }

  set productId(value: UniqueEntityID) {
    this.props.productId = value
  }

  set trimsId(value: UniqueEntityID) {
    this.props.trimsId = value
  }

  static create(props: ProductTrimsProps, id?: UniqueEntityID) {
    const productTrims = new ProductTrims(props, id)
    return productTrims
  }
}
