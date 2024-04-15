import { WatchedList } from '@/core/entities/whatched-list'
import { ProductFeedStock } from './product-feed-stock'

export class ProductFeedStoksList extends WatchedList<ProductFeedStock> {
  compareItems(a: ProductFeedStock, b: ProductFeedStock): boolean {
    return a.feedStockId.equals(b.feedStockId)
  }
}
