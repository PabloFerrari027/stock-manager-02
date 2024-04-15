import { WatchedList } from '@/core/entities/whatched-list'
import { DepartmentRole } from './department-role'

export class DepartmentRolesList extends WatchedList<DepartmentRole> {
  compareItems(a: DepartmentRole, b: DepartmentRole): boolean {
    return a.roleId.equals(b.roleId)
  }
}
