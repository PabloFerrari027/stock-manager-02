import { FeedStockRepository } from '@/domain/materials/application/repositories/feed-stock-repository'
import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { UpdateFeedStock } from './update-feed-stock'
import { container } from 'tsyringe'
import { makeFeedStock } from 'test/factories/make-feed-stock'
import { NotFoundError } from '@/core/errors/not-found-error'
import { faker } from '@faker-js/faker'
import { Text } from '@/core/entities/text'

let updateFeedStock: UpdateFeedStock
let feedstockRepository: FeedStockRepository

describe('Update FeedStock', () => {
  beforeEach(() => {
    feedstockRepository = MakeAllRepositories.FeedStockRepository
    updateFeedStock = container.resolve(UpdateFeedStock)
  })

  it('Should to be able to update a feedstock', async () => {
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

  it('Should to be able to throw error if the feedstock is not found', async () => {
    const response = await updateFeedStock.execute({
      id: 'feedstock-1',
      name: 'feedstock-1',
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(NotFoundError)
  })
})
