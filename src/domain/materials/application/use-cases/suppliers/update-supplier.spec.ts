import { SuppliersRepository } from '@/domain/materials/application/repositories/supplier-repository'
import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { UpdateSupplier } from './update-supplier'
import { container } from 'tsyringe'
import { makeSupplier } from 'test/factories/make-supplier'
import { NotFoundError } from '@/core/errors/not-found-error'
import { Text } from '@/core/entities/text'
import { faker } from '@faker-js/faker'

let updateSupplier: UpdateSupplier
let suppliersRepository: SuppliersRepository

describe('Update Supplier', () => {
  beforeEach(() => {
    suppliersRepository = MakeAllRepositories.SuppliersRepository
    updateSupplier = container.resolve(UpdateSupplier)
  })

  it('Should to be able to update a supplier', async () => {
    const supplier = makeSupplier.execute({})

    await suppliersRepository.create(supplier)

    const name = Text.create(faker.company.name(), 'Pascalcase').value

    const response = await updateSupplier.execute({
      id: supplier.id.toString(),
      name,
    })

    expect(response.isRight()).toBeTruthy()

    const getSupplier = await suppliersRepository.findById(
      supplier.id.toString(),
    )

    expect(getSupplier?.name.value).toEqual(name)
  })

  it('Should to be able to throw error if the supplier is not found', async () => {
    const response = await updateSupplier.execute({
      id: 'supplier-1',
      name: 'supplier-1',
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(NotFoundError)
  })
})
