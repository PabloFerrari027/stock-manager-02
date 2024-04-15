import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User, UserProps } from './user'

export interface SupplierProps extends UserProps {
  phone: string
}

export class Supplier extends User {
  static create(props: UserProps, id?: UniqueEntityID) {
    const supplier = new Supplier(props, id)
    return supplier
  }
}
