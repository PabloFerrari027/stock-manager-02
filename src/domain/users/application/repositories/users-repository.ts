import { PaginationParams } from '@/core/types/pagination-params'
import { User } from '../../enterprise/entities/user'
import { ListingResponse } from '@/core/types/listing-response'

export interface UsersRepository {
  create(data: User): Promise<void>
  save(data: User): Promise<void>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  list(options: PaginationParams): Promise<ListingResponse<User>>
}
