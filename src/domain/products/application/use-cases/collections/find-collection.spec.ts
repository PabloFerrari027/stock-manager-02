import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { FindCollection } from './find-collection'
import { container } from 'tsyringe'
import { makeCollection } from 'test/factories/products/make-collection'
import { CollectionsRepository } from '../../repositories/collections-repository'

let findCollection: FindCollection
let collectionsRepository: CollectionsRepository

describe('Find Collection', () => {
  beforeEach(() => {
    collectionsRepository = MakeAllRepositories.products.CollectionsRepository
    findCollection = container.resolve(FindCollection)
  })

  it('Should to be able to find a collection', async () => {
    const collection = makeCollection.execute({})

    await collectionsRepository.create(collection)

    const response = await findCollection.execute({
      id: collection.id.toString(),
    })

    expect(response.isRight()).toBeTruthy()
    expect(collection).toEqual(response.value?.collection)
  })

  it('Should to be able to throw error if the collection is not found', async () => {
    const response = await findCollection.execute({
      id: 'collection-1',
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value?.collection).not.toBeTruthy()
  })
})
