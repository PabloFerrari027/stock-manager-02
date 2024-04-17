import { WatchedList } from '@/core/entities/whatched-list'
import { ProductTrims } from './product-trims'

export class ProductTrimsList extends WatchedList<ProductTrims> {
  compareItems(a: ProductTrims, b: ProductTrims): boolean {
    return a.trimsId.equals(b.trimsId)
  }
}
