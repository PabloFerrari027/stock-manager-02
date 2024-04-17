import { Either, right } from '@/core/either'
import { Collection } from '../../../enterprise/entities/collection'
import { inject, injectable } from 'tsyringe'
import { CollectionsRepository } from '../../repositories/collections-repository'
import { PaginationParams } from '@/core/types/pagination-params'
import { ListingResponse } from '@/core/types/listing-response'

interface ListCollectionsRequest extends PaginationParams {}

type ListCollectionsResponse = Either<null, ListingResponse<Collection>>

@injectable()
export class ListCollections {
  constructor(
    @inject('CollectionsRepository')
    private collectionsRepository: CollectionsRepository,
  ) {}

  async execute(
    data: ListCollectionsRequest,
  ): Promise<ListCollectionsResponse> {
    const response = await this.collectionsRepository.list(data)

    return right(response)
  }
}
