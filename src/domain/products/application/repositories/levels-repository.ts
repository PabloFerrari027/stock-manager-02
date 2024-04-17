import { PaginationParams } from '@/core/types/pagination-params'
import { ListingResponse } from '@/core/types/listing-response'
import { Level } from '../../enterprise/entities/level'

export interface LevelsRepository {
  create(data: Level): Promise<void>
  save(data: Level): Promise<void>
  findById(id: string): Promise<Level | null>
  findByName(name: string): Promise<Level | null>
  list(options: PaginationParams): Promise<ListingResponse<Level>>
}
