import { FeedStocksRepository } from '@/domain/materials/application/repositories/feed-stocks-repository'
import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { FindFeedStock } from './find-feed-stock'
import { container } from 'tsyringe'
import { makeFeedStock } from 'test/factories/materials/make-feed-stock'

let findFeedStock: FindFeedStock
let feedstockRepository: FeedStocksRepository

describe('Find FeedStock', () => {
  beforeEach(() => {
    feedstockRepository = MakeAllRepositories.materials.FeedStocksRepository
    findFeedStock = container.resolve(FindFeedStock)
  })

  it('Should to be able to find a feedstock', async () => {
    const feedstock = makeFeedStock.execute({})

    await feedstockRepository.create(feedstock)

    const response = await findFeedStock.execute({
      id: feedstock.id.toString(),
    })

    expect(response.isRight()).toBeTruthy()
    expect(feedstock).toEqual(response.value?.feedstock)
  })

  it('Should to be able to throw error if the feedstock is not found', async () => {
    const response = await findFeedStock.execute({
      id: 'feedstock-1',
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value?.feedstock).not.toBeTruthy()
  })
})
