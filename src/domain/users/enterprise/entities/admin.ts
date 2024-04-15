import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User, UserProps } from './user'

export interface AdminProps extends UserProps {}

export class Admin extends User {
  static create(props: UserProps, id?: UniqueEntityID) {
    const admin = new Admin(props, id)
    return admin
  }
}
