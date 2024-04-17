import { Either, left, right } from '@/core/either'
import { Collection } from '../../../enterprise/entities/collection'
import { Text } from '@/core/entities/text'
import { inject, injectable } from 'tsyringe'
import { NotFoundError } from '@/core/errors/not-found-error'
import { CollectionsRepository } from '../../repositories/collections-repository'
import { AlreadyExistsError } from '@/core/errors/already-exists-error'

interface CreateCollectionRequest {
  name: string
}

type CreateCollectionResponse = Either<
  NotFoundError,
  {
    collection: Collection
  }
>

@injectable()
export class CreateCollection {
  constructor(
    @inject('CollectionsRepository')
    private collectionsRepository: CollectionsRepository,
  ) {}

  async execute(
    data: CreateCollectionRequest,
  ): Promise<CreateCollectionResponse> {
    const name = Text.create(data.name, 'Pascalcase')

    const getByName = await this.collectionsRepository.findByName(name.value)

    if (getByName) {
      const message = `Name ${name} already exists!`

      return left(new AlreadyExistsError(message))
    }

    const collection = Collection.create({
      name,
      isActive: true,
    })

    await this.collectionsRepository.create(collection)

    return right({
      collection,
    })
  }
}
