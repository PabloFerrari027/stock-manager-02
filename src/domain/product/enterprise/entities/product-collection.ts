import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface ProductCollectionProps {
  collectionId: UniqueEntityID
  productId: UniqueEntityID
}

export class ProductCollection extends Entity<ProductCollectionProps> {
  get collectionId() {
    return this.props.collectionId
  }

  get productId() {
    return this.props.productId
  }

  set collectionId(value: UniqueEntityID) {
    this.props.collectionId = value
  }

  set productId(value: UniqueEntityID) {
    this.props.productId = value
  }

  static create(props: ProductCollectionProps, id?: UniqueEntityID) {
    const productCollection = new ProductCollection(props, id)
    return productCollection
  }
}
