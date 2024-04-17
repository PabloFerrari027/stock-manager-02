import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { FindType } from './find-type'
import { container } from 'tsyringe'
import { makeType } from 'test/factories/products/make-type'
import { TypesRepository } from '../../repositories/types-repository'

let findType: FindType
let typesRepository: TypesRepository

describe('Find Type', () => {
  beforeEach(() => {
    typesRepository = MakeAllRepositories.products.TypesRepository
    findType = container.resolve(FindType)
  })

  it('Should to be able to find a type', async () => {
    const type = makeType.execute({})

    await typesRepository.create(type)

    const response = await findType.execute({
      id: type.id.toString(),
    })

    expect(response.isRight()).toBeTruthy()
    expect(type).toEqual(response.value?.type)
  })

  it('Should to be able to throw error if the type is not found', async () => {
    const response = await findType.execute({
      id: 'type-1',
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value?.type).not.toBeTruthy()
  })
})
