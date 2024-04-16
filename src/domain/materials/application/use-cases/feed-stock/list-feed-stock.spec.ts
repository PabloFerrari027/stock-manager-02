import { FeedStockRepository } from '@/domain/materials/application/repositories/feed-stock-repository'
import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { ListFeedStock } from './list-feed-stock'
import { container } from 'tsyringe'
import { makeFeedStock } from 'test/factories/make-feed-stock'
import { FeedStock } from '../../../enterprise/entities/feed-stock'
import { Text } from '@/core/entities/text'

let listFeedStock: ListFeedStock
let feedStockRepository: FeedStockRepository

describe('List FeedStock', () => {
  beforeEach(() => {
    feedStockRepository = MakeAllRepositories.FeedStockRepository
    listFeedStock = container.resolve(ListFeedStock)
  })

  it('Should to be able to list feed-stock', async () => {
    for (let i = 0; i < 10; i++) {
      const feedStock = makeFeedStock.execute({})

      await feedStockRepository.create(feedStock)
    }

    const response = await listFeedStock.execute({ take: 100 })

    expect(response.isRight()).toBeTruthy()

    expect(response.value?.data).toHaveLength(10)

    expect(response.value).toEqual({
      hasNext: false,
      data: expect.arrayContaining([expect.any(FeedStock)]),
    })
  })

  it('Should be able to list the feed-stock by creation date in order ascending', async () => {
    for (let i = 0; i <= 10; i++) {
      const name = Text.create(`feed stock ${i}`, 'Pascalcase')

      const feedStock = makeFeedStock.execute({
        name,
        createdAt: new Date(2024, 0, i + i),
      })

      await feedStockRepository.create(feedStock)
    }

    const response = await listFeedStock.execute({
      take: 100,
      order: 'asc',
      orderBy: 'createdAt',
    })

    response.value?.data.forEach((s, i) => {
      expect(s.name.value).toEqual(`Feed Stock ${i}`)
    })
  })

  it('Should be able to list the feed-stock by creation date in order descending', async () => {
    for (let i = 0; i <= 10; i++) {
      const name = Text.create(`Feed Stock ${i}`, 'Pascalcase')

      const feedStock = makeFeedStock.execute({
        name,
        createdAt: new Date(2024, 0, i + i),
      })

      await feedStockRepository.create(feedStock)
    }

    const response = await listFeedStock.execute({
      take: 100,
      order: 'desc',
      orderBy: 'createdAt',
    })

    response.value?.data.forEach((s, i) => {
      expect(s.name.value).toEqual(`Feed Stock ${10 - i}`)
    })
  })
})
