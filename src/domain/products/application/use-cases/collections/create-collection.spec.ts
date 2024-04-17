import { CollectionsRepository } from '../../repositories/collections-repository'
import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { CreateCollection } from './create-collection'
import { container } from 'tsyringe'
import { faker } from '@faker-js/faker'
import { makeCollection } from 'test/factories/products/make-collection'
import { AlreadyExistsError } from '@/core/errors/already-exists-error'
import { Text } from '@/core/entities/text'

let createCollection: CreateCollection
let collectionsRepository: CollectionsRepository

describe('Create Collection', () => {
  beforeEach(() => {
    collectionsRepository = MakeAllRepositories.products.CollectionsRepository
    createCollection = container.resolve(CreateCollection)
  })

  it('Should to be able to create a collection', async () => {
    const name = Text.create(faker.person.fullName(), 'Pascalcase').value

    const response = await createCollection.execute({
      name,
    })

    expect(response.isRight()).toBeTruthy()

    const { data } = await collectionsRepository.list({})

    expect(data[0].name.value).toEqual(name)
  })

  it('Should to be able to throw error if the name already exists', async () => {
    const name = Text.create(faker.person.fullName(), 'Pascalcase')

    const collection = makeCollection.execute({ name })

    await collectionsRepository.create(collection)

    const response = await createCollection.execute({
      name: name.value,
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(AlreadyExistsError)
  })
})
