import { SuppliersRepository } from '@/domain/materials/application/repositories/suppliers-repository'
import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { ListSuppliers } from './list-suppliers'
import { container } from 'tsyringe'
import { makeSupplier } from 'test/factories/materials/make-supplier'
import { Supplier } from '../../../enterprise/entities/supplier'
import { Text } from '@/core/entities/text'

let listSuppliers: ListSuppliers
let suppliersRepository: SuppliersRepository

describe('List Supplier', () => {
  beforeEach(() => {
    suppliersRepository = MakeAllRepositories.materials.SuppliersRepository
    listSuppliers = container.resolve(ListSuppliers)
  })

  it('Should to be able to list suppliers', async () => {
    for (let i = 0; i < 10; i++) {
      const supplier = makeSupplier.execute({})

      await suppliersRepository.create(supplier)
    }

    const response = await listSuppliers.execute({ take: 100 })

    expect(response.isRight()).toBeTruthy()

    expect(response.value?.data).toHaveLength(10)

    expect(response.value).toEqual({
      hasNext: false,
      data: expect.arrayContaining([expect.any(Supplier)]),
    })
  })

  it('Should be able to list the suppliers by creation date in order ascending', async () => {
    for (let i = 0; i <= 10; i++) {
      const name = Text.create(`supplier-${i}`, 'Pascalcase')

      const supplier = makeSupplier.execute({
        name,
        createdAt: new Date(2024, 0, i + i),
      })

      await suppliersRepository.create(supplier)
    }

    const response = await listSuppliers.execute({
      take: 100,
      order: 'asc',
      orderBy: 'createdAt',
    })

    response.value?.data.forEach((s, i) => {
      expect(s.name.value).toEqual(`Supplier-${i}`)
    })
  })

  it('Should be able to list the suppliers by creation date in order descending', async () => {
    for (let i = 0; i <= 10; i++) {
      const name = Text.create(`supplier-${i}`, 'Pascalcase')

      const supplier = makeSupplier.execute({
        name,
        createdAt: new Date(2024, 0, i + i),
      })

      await suppliersRepository.create(supplier)
    }

    const response = await listSuppliers.execute({
      take: 100,
      order: 'desc',
      orderBy: 'createdAt',
    })

    response.value?.data.forEach((s, i) => {
      expect(s.name.value).toEqual(`Supplier-${10 - i}`)
    })
  })
})
