import { PaginationParams } from '@/core/types/pagination-params'
import { Department } from '../../enterprise/entities/department'
import { ListingResponse } from '@/core/types/listing-response'

export interface DepartmentsRepository {
  create(data: Department): Promise<void>
  save(data: Department): Promise<void>
  findById(id: string): Promise<Department | null>
  findByName(name: string): Promise<Department | null>
  list(options: PaginationParams): Promise<ListingResponse<Department>>
}
