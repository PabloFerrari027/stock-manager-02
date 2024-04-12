import { Entity } from '@/core/entities/entity'
import { SKU } from './value-objects/SKU'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ProductVariationsList } from './product-variations-list'

export interface ProductProps {
  name: string
  SKU: SKU
  variations: ProductVariationsList
  lineId: UniqueEntityID
  collectionId: UniqueEntityID
  categoryId: UniqueEntityID
  typeId: UniqueEntityID
  gridId: UniqueEntityID
  levelId: UniqueEntityID
  createdAt: Date
  updatedAt: Date
}

export class Product extends Entity<ProductProps> {
  get name(): string {
    return this.props.name
  }

  get SKU(): SKU {
    return this.props.SKU
  }

  set name(name: string) {
    this.props.name = name
  }

  static create(props: ProductProps, id?: UniqueEntityID): Product {
    const product = new Product(props, id)
    return product
  }
}
