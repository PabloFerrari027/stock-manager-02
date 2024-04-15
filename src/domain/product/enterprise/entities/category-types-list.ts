import { WatchedList } from '@/core/entities/whatched-list'
import { CategoryType } from './category-type'

export class CategoryTypesList extends WatchedList<CategoryType> {
  compareItems(a: CategoryType, b: CategoryType): boolean {
    return a.typeId.equals(b.typeId)
  }
}
