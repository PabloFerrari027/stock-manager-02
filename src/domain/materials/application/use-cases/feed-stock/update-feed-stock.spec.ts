import { FeedStocksRepository } from '@/domain/materials/application/repositories/feed-stocks-repository'
import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { UpdateFeedStock } from './update-feed-stock'
import { container } from 'tsyringe'
import { makeFeedStock } from 'test/factories/materials/make-feed-stock'
import { NotFoundError } from '@/core/errors/not-found-error'
import { faker } from '@faker-js/faker'
import { Text } from '@/core/entities/text'

let updateFeedStock: UpdateFeedStock
let feedstockRepository: FeedStocksRepository

describe('Update FeedStock', () => {
  beforeEach(() => {
    feedstockRepository = MakeAllRepositories.materials.FeedStocksRepository
    updateFeedStock = container.resolve(UpdateFeedStock)
  })

  it('Should to be able to update a feed stock', async () => {
    const feedstock = makeFeedStock.execute({})

    await feedstockRepository.create(feedstock)

    const name = Text.create(
      faker.commerce.productMaterial(),
      'Pascalcase',
    ).value

    const response = await updateFeedStock.execute({
      id: feedstock.id.toString(),
      name,
    })

    expect(response.isRight()).toBeTruthy()

    const getFeedStock = await feedstockRepository.findById(
      feedstock.id.toString(),
    )

    expect(getFeedStock?.name.value).toEqual(name)
  })

  it('Should to be able to throw error if the feed stock is not found', async () => {
    const response = await updateFeedStock.execute({
      id: 'feed-stock-1',
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(NotFoundError)
  })

  it('Should to be able to throw error if the feed stock is not found', async () => {
    const response = await updateFeedStock.execute({
      id: 'feedstock-1',
      name: 'feedstock-1',
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(NotFoundError)
  })
})
