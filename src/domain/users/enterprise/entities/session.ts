import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User } from './user'

export interface SessionProps {
  accessToken: string
  refreshToken: string
  expiresIn: number
  user: User
}

export class Session extends Entity<SessionProps> {
  get accessToken() {
    return this.props.accessToken
  }

  get refreshToken() {
    return this.props.refreshToken
  }

  set accessToken(value: string) {
    this.props.accessToken = value
  }

  set refreshToken(value: string) {
    this.props.refreshToken = value
  }

  static create(props: SessionProps, id?: UniqueEntityID) {
    const session = new Session(props, id)
    return session
  }
}
