import { WatchedList } from '@/core/entities/whatched-list'
import { ProductVariation } from './product-variation'

export class ProductVariationsList extends WatchedList<ProductVariation> {
  compareItems(a: ProductVariation, b: ProductVariation): boolean {
    return a.variationId.equals(b.variationId)
  }
}
