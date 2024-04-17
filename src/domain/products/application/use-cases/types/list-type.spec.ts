import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { ListTypes } from './list-types'
import { container } from 'tsyringe'
import { makeType } from 'test/factories/products/make-type'
import { Type } from '../../../enterprise/entities/type'
import { TypesRepository } from '../../repositories/types-repository'
import { Text } from '@/core/entities/text'

let listTypes: ListTypes
let typesRepository: TypesRepository

describe('List Type', () => {
  beforeEach(() => {
    typesRepository = MakeAllRepositories.products.TypesRepository
    listTypes = container.resolve(ListTypes)
  })

  it('Should to be able to list types', async () => {
    for (let i = 0; i < 10; i++) {
      const type = makeType.execute({})

      await typesRepository.create(type)
    }

    const response = await listTypes.execute({ take: 100 })

    expect(response.isRight()).toBeTruthy()

    expect(response.value?.data).toHaveLength(10)

    expect(response.value).toEqual({
      hasNext: false,
      data: expect.arrayContaining([expect.any(Type)]),
    })
  })

  it('Should be able to list the types by creation date in order ascending', async () => {
    for (let i = 0; i <= 10; i++) {
      const name = Text.create(`type-${i}`, 'Pascalcase')

      const type = makeType.execute({
        name,
        createdAt: new Date(2024, 0, i + i),
      })

      await typesRepository.create(type)
    }

    const response = await listTypes.execute({
      take: 100,
      order: 'asc',
      orderBy: 'createdAt',
    })

    response.value?.data.forEach((s, i) => {
      expect(s.name.value).toEqual(`Type-${i}`)
    })
  })

  it('Should be able to list the types by creation date in order descending', async () => {
    for (let i = 0; i <= 10; i++) {
      const name = Text.create(`type-${i}`, 'Pascalcase')

      const type = makeType.execute({
        name,
        createdAt: new Date(2024, 0, i + i),
      })

      await typesRepository.create(type)
    }

    const response = await listTypes.execute({
      take: 100,
      order: 'desc',
      orderBy: 'createdAt',
    })

    response.value?.data.forEach((s, i) => {
      expect(s.name.value).toEqual(`Type-${10 - i}`)
    })
  })
})
