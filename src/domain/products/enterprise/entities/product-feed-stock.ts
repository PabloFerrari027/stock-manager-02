import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface ProductFeedStockProps {
  productId: UniqueEntityID
  feedStockId: UniqueEntityID
}

export class ProductFeedStock extends Entity<ProductFeedStockProps> {
  get productId() {
    return this.props.productId
  }

  get feedStockId() {
    return this.props.feedStockId
  }

  static create(props: ProductFeedStockProps, id?: UniqueEntityID) {
    const productFeedStock = new ProductFeedStock(props, id)
    return productFeedStock
  }
}
