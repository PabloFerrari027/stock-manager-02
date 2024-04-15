import { Entity } from '@/core/entities/entity'
import { RoleProps } from './role'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface DepartmentRoleProps extends RoleProps {
  departmentId: UniqueEntityID
  roleId: UniqueEntityID
}

export class DepartmentRole extends Entity<DepartmentRoleProps> {
  get departmentId() {
    return this.props.departmentId
  }

  get roleId() {
    return this.props.roleId
  }

  static create(props: DepartmentRoleProps, id?: UniqueEntityID) {
    const departmentRole = new DepartmentRole(props, id)
    return departmentRole
  }
}
