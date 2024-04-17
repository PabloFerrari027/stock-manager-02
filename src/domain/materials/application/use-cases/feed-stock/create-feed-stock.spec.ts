import { FeedStocksRepository } from '@/domain/materials/application/repositories/feed-stocks-repository'
import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { CreateFeedStock } from './create-feed-stock'
import { container } from 'tsyringe'
import { makeFeedStock } from 'test/factories/materials/make-feed-stock'
import { makeSupplier } from 'test/factories/materials/make-supplier'
import { SuppliersRepository } from '../../repositories/suppliers-repository'
import { NotFoundError } from '@/core/errors/not-found-error'

let createFeedStock: CreateFeedStock
let feedstockRepository: FeedStocksRepository
let suppliersRepository: SuppliersRepository

describe('Create FeedStock', () => {
  beforeEach(() => {
    feedstockRepository = MakeAllRepositories.materials.FeedStocksRepository
    suppliersRepository = MakeAllRepositories.materials.SuppliersRepository
    createFeedStock = container.resolve(CreateFeedStock)
  })

  it('Should to be able to create a feedstock', async () => {
    const supplier = makeSupplier.execute({})

    await suppliersRepository.create(supplier)

    const feedstock = makeFeedStock.execute({
      supplierId: supplier.id,
    })

    const result = await createFeedStock.execute({
      name: feedstock.name.value,
      supplierId: feedstock.supplierId.toString(),
      unit: feedstock.unit.value,
    })

    expect(result.isRight()).toBeTruthy()

    const { data } = await feedstockRepository.list({ take: 1 })

    expect(data[0]?.name).toEqual(feedstock.name)
    expect(data[0]?.supplierId.equals(supplier.id)).toBeTruthy()
    expect(data[0]?.unit).toEqual(feedstock.unit)
  })

  it('Should to be able to throw error if the supplier is not found', async () => {
    const feedstock = makeFeedStock.execute({})

    const response = await createFeedStock.execute({
      name: feedstock.name.value,
      supplierId: feedstock.supplierId.toString(),
      unit: feedstock.unit.value,
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(NotFoundError)
  })
})
