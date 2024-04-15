import { WatchedList } from '@/core/entities/whatched-list'
import { ProductCollection } from './product-collection'

export class ProductCollectionsList extends WatchedList<ProductCollection> {
  compareItems(a: ProductCollection, b: ProductCollection): boolean {
    return a.collectionId.equals(b.collectionId)
  }
}
