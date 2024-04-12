import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { VariationProps } from './variation'
import { Entity } from '@/core/entities/entity'

export interface ProductVariationProps extends VariationProps {
  productId: UniqueEntityID
  variationId: UniqueEntityID
}

export class ProductVariation extends Entity<ProductVariationProps> {
  get productId() {
    return this.props.productId
  }

  get variationId() {
    return this.props.variationId
  }

  static create(props: ProductVariationProps, id?: UniqueEntityID) {
    const productVariation = new ProductVariation(props, id)
    return productVariation
  }
}
