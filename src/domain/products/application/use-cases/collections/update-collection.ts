import { Either, left, right } from '@/core/either'
import { Collection } from '../../../enterprise/entities/collection'
import { inject, injectable } from 'tsyringe'
import { NotFoundError } from '@/core/errors/not-found-error'
import { Text } from '@/core/entities/text'
import { CollectionsRepository } from '../../repositories/collections-repository'
import { AlreadyExistsError } from '@/core/errors/already-exists-error'

interface UpdateCollectionRequest {
  id: string
  name?: string
}

type UpdateCollectionResponse = Either<
  NotFoundError | AlreadyExistsError,
  {
    collection: Collection
  }
>

@injectable()
export class UpdateCollection {
  constructor(
    @inject('CollectionsRepository')
    private collectionsRepository: CollectionsRepository,
  ) {}

  async execute(
    data: UpdateCollectionRequest,
  ): Promise<UpdateCollectionResponse> {
    const collection = await this.collectionsRepository.findById(data.id)

    if (!collection) {
      return left(new NotFoundError())
    }

    if (data.name) {
      const name = Text.create(data.name, 'Pascalcase')

      const getByName = await this.collectionsRepository.findByName(name.value)

      if (getByName) {
        const message = `Name ${name} already exists!`

        return left(new AlreadyExistsError(message))
      }

      collection.name = name
    }

    await this.collectionsRepository.save(collection)

    return right({
      collection,
    })
  }
}
