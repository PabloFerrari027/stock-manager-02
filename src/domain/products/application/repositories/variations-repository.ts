import { PaginationParams } from '@/core/types/pagination-params'
import { Variation } from '../../enterprise/entities/variation'
import { ListingResponse } from '@/core/types/listing-response'

export interface VariationsRepository {
  create(data: Variation): Promise<void>
  createMany(data: Variation[]): Promise<void>
  save(data: Variation): Promise<void>
  findById(id: string): Promise<Variation | null>
  findBySKU(SKU: string): Promise<Variation | null>
  list(options: PaginationParams): Promise<ListingResponse<Variation>>
}
