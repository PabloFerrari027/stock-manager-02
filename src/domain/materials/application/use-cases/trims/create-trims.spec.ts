import { TrimsRepository } from '@/domain/materials/application/repositories/trims-repository'
import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { CreateTrims } from './create-trims'
import { container } from 'tsyringe'
import { makeTrims } from 'test/factories/materials/make-trims'
import { makeSupplier } from 'test/factories/materials/make-supplier'
import { SuppliersRepository } from '../../repositories/suppliers-repository'
import { NotFoundError } from '@/core/errors/not-found-error'

let createTrims: CreateTrims
let trimsRepository: TrimsRepository
let suppliersRepository: SuppliersRepository

describe('Create Trims', () => {
  beforeEach(() => {
    trimsRepository = MakeAllRepositories.materials.TrimsRepository
    suppliersRepository = MakeAllRepositories.materials.SuppliersRepository
    createTrims = container.resolve(CreateTrims)
  })

  it('Should to be able to create a trims', async () => {
    const supplier = makeSupplier.execute({})

    await suppliersRepository.create(supplier)

    const trims = makeTrims.execute({
      supplierId: supplier.id,
    })

    const result = await createTrims.execute({
      name: trims.name.value,
      supplierId: trims.supplierId.toString(),
      unit: trims.unit.value,
    })

    expect(result.isRight()).toBeTruthy()

    const { data } = await trimsRepository.list({ take: 1 })

    expect(data[0]?.name).toEqual(trims.name)
    expect(data[0]?.supplierId.equals(supplier.id)).toBeTruthy()
    expect(data[0]?.unit).toEqual(trims.unit)
  })

  it('Should to be able to throw error if the supplier is not found', async () => {
    const trims = makeTrims.execute({})

    const response = await createTrims.execute({
      name: trims.name.value,
      supplierId: trims.supplierId.toString(),
      unit: trims.unit.value,
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(NotFoundError)
  })
})
