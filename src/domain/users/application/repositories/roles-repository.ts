import { PaginationParams } from '@/core/types/pagination-params'
import { Role } from '../../enterprise/entities/role'
import { ListingResponse } from '@/core/types/listing-response'

export interface RolesRepository {
  create(data: Role): Promise<void>
  save(data: Role): Promise<void>
  findById(id: string): Promise<Role | null>
  findByName(name: string): Promise<Role | null>
  list(options: PaginationParams): Promise<ListingResponse<Role>>
}
