import { WatchedList } from '@/core/entities/whatched-list'
import { TypeLevel } from './type-level'

export class TypeLevelsList extends WatchedList<TypeLevel> {
  compareItems(a: TypeLevel, b: TypeLevel): boolean {
    return a.levelId.equals(b.levelId)
  }
}
