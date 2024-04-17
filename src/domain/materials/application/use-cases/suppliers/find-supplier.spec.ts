import { SuppliersRepository } from '@/domain/materials/application/repositories/suppliers-repository'
import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { FindSupplier } from './find-supplier'
import { container } from 'tsyringe'
import { makeSupplier } from 'test/factories/materials/make-supplier'

let findSupplier: FindSupplier
let suppliersRepository: SuppliersRepository

describe('Find Supplier', () => {
  beforeEach(() => {
    suppliersRepository = MakeAllRepositories.materials.SuppliersRepository
    findSupplier = container.resolve(FindSupplier)
  })

  it('Should to be able to find a supplier', async () => {
    const supplier = makeSupplier.execute({})

    await suppliersRepository.create(supplier)

    const response = await findSupplier.execute({
      id: supplier.id.toString(),
    })

    expect(response.isRight()).toBeTruthy()
    expect(supplier).toEqual(response.value?.supplier)
  })

  it('Should to be able to throw error if the supplier is not found', async () => {
    const response = await findSupplier.execute({
      id: 'supplier-1',
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value?.supplier).not.toBeTruthy()
  })
})
