import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { ListCollections } from './list-collection'
import { container } from 'tsyringe'
import { makeCollection } from 'test/factories/products/make-collection'
import { Collection } from '../../../enterprise/entities/collection'
import { CollectionsRepository } from '../../repositories/collections-repository'
import { Text } from '@/core/entities/text'

let listCollections: ListCollections
let collectionsRepository: CollectionsRepository

describe('List Collection', () => {
  beforeEach(() => {
    collectionsRepository = MakeAllRepositories.products.CollectionsRepository
    listCollections = container.resolve(ListCollections)
  })

  it('Should to be able to list collections', async () => {
    for (let i = 0; i < 10; i++) {
      const collection = makeCollection.execute({})

      await collectionsRepository.create(collection)
    }

    const response = await listCollections.execute({ take: 100 })

    expect(response.isRight()).toBeTruthy()

    expect(response.value?.data).toHaveLength(10)

    expect(response.value).toEqual({
      hasNext: false,
      data: expect.arrayContaining([expect.any(Collection)]),
    })
  })

  it('Should be able to list the collections by creation date in order ascending', async () => {
    for (let i = 0; i <= 10; i++) {
      const name = Text.create(`collection-${i}`, 'Pascalcase')

      const collection = makeCollection.execute({
        name,
        createdAt: new Date(2024, 0, i + i),
      })

      await collectionsRepository.create(collection)
    }

    const response = await listCollections.execute({
      take: 100,
      order: 'asc',
      orderBy: 'createdAt',
    })

    response.value?.data.forEach((s, i) => {
      expect(s.name.value).toEqual(`Collection-${i}`)
    })
  })

  it('Should be able to list the collections by creation date in order descending', async () => {
    for (let i = 0; i <= 10; i++) {
      const name = Text.create(`collection-${i}`, 'Pascalcase')

      const collection = makeCollection.execute({
        name,
        createdAt: new Date(2024, 0, i + i),
      })

      await collectionsRepository.create(collection)
    }

    const response = await listCollections.execute({
      take: 100,
      order: 'desc',
      orderBy: 'createdAt',
    })

    response.value?.data.forEach((s, i) => {
      expect(s.name.value).toEqual(`Collection-${10 - i}`)
    })
  })
})
