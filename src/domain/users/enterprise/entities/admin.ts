import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User, UserProps } from './user'
import { Optional } from '@/core/types/optional'

export interface AdminProps extends UserProps {}

export class Admin extends User {
  static create(props: Optional<AdminProps, 'createdAt'>, id?: UniqueEntityID) {
    const admin = new Admin(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    )

    return admin
  }
}
