import { SuppliersRepository } from '@/domain/materials/application/repositories/suppliers-repository'
import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { CreateSupplier } from './create-supplier'
import { container } from 'tsyringe'
import { faker } from '@faker-js/faker'

let createSupplier: CreateSupplier
let suppliersRepository: SuppliersRepository

describe('Create Supplier', () => {
  beforeEach(() => {
    suppliersRepository = MakeAllRepositories.materials.SuppliersRepository
    createSupplier = container.resolve(CreateSupplier)
  })

  it('Should to be able to create a supplier', async () => {
    await createSupplier.execute({
      name: faker.company.name(),
    })

    const { data, hasNext } = await suppliersRepository.list({})

    expect(hasNext).not.toBeTruthy()

    expect(data).toHaveLength(1)
  })
})
