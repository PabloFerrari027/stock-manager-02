import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User, UserProps } from './user'
import { Optional } from '@/core/types/optional'

export interface SupplierProps extends UserProps {
  phone: string
}

export class Supplier extends User {
  static create(
    props: Optional<SupplierProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const supplier = new Supplier(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    )
    return supplier
  }
}
