import { Either, right } from '@/core/either'
import { Collection } from '../../../enterprise/entities/collection'
import { inject, injectable } from 'tsyringe'
import { CollectionsRepository } from '../../repositories/collections-repository'

interface FindCollectionRequest {
  id: string
}

type FindCollectionResponse = Either<
  null,
  {
    collection: Collection | null
  }
>

@injectable()
export class FindCollection {
  constructor(
    @inject('CollectionsRepository')
    private collectionsRepository: CollectionsRepository,
  ) {}

  async execute(data: FindCollectionRequest): Promise<FindCollectionResponse> {
    const collection = await this.collectionsRepository.findById(data.id)

    return right({
      collection,
    })
  }
}
