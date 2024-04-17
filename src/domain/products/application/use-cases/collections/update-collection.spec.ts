import { CollectionsRepository } from '../../repositories/collections-repository'
import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { UpdateCollection } from './update-collection'
import { container } from 'tsyringe'
import { faker } from '@faker-js/faker'
import { makeCollection } from 'test/factories/products/make-collection'
import { AlreadyExistsError } from '@/core/errors/already-exists-error'
import { Text } from '@/core/entities/text'
import { NotFoundError } from '@/core/errors/not-found-error'

let updateCollection: UpdateCollection
let collectionsRepository: CollectionsRepository

describe('Update Collection', () => {
  beforeEach(() => {
    collectionsRepository = MakeAllRepositories.products.CollectionsRepository
    updateCollection = container.resolve(UpdateCollection)
  })

  it('Should to be able to update a collection', async () => {
    const name = Text.create(faker.person.fullName(), 'Pascalcase').value

    const collection = makeCollection.execute({})

    await collectionsRepository.create(collection)

    const response = await updateCollection.execute({
      id: collection.id.toString(),
      name,
    })

    expect(response.isRight()).toBeTruthy()

    const { data } = await collectionsRepository.list({})

    expect(data[0].name.value).toEqual(name)
  })

  it('Should to be able to throw error if the collection is not found', async () => {
    const response = await updateCollection.execute({
      id: 'collection-1',
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(NotFoundError)
  })

  it('Should to be able to throw error if the name already exists', async () => {
    const name = Text.create(faker.person.fullName(), 'Pascalcase')

    const collection = makeCollection.execute({
      name,
    })

    await collectionsRepository.create(collection)

    const response = await updateCollection.execute({
      id: collection.id.toString(),
      name: name.value,
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(AlreadyExistsError)
  })
})
