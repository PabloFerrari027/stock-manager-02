import { TrimsRepository } from '@/domain/materials/application/repositories/trims-repository'
import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { ListTrims } from './list-trims'
import { container } from 'tsyringe'
import { makeTrims } from 'test/factories/make-trims'
import { Trims } from '../../../enterprise/entities/trims'
import { Text } from '@/core/entities/text'

let listTrims: ListTrims
let trimsRepository: TrimsRepository

describe('List Trims', () => {
  beforeEach(() => {
    trimsRepository = MakeAllRepositories.TrimsRepository
    listTrims = container.resolve(ListTrims)
  })

  it('Should to be able to list trims', async () => {
    for (let i = 0; i < 10; i++) {
      const trims = makeTrims.execute({})

      await trimsRepository.create(trims)
    }

    const response = await listTrims.execute({ take: 100 })

    expect(response.isRight()).toBeTruthy()

    expect(response.value?.data).toHaveLength(10)

    expect(response.value).toEqual({
      hasNext: false,
      data: expect.arrayContaining([expect.any(Trims)]),
    })
  })

  it('Should be able to list the trims by creation date in order ascending', async () => {
    for (let i = 0; i <= 10; i++) {
      const name = Text.create(`Trims-${i}`, 'Pascalcase')

      const trims = makeTrims.execute({
        name,
        createdAt: new Date(2024, 0, i + i),
      })

      await trimsRepository.create(trims)
    }

    const response = await listTrims.execute({
      take: 100,
      order: 'asc',
      orderBy: 'createdAt',
    })

    response.value?.data.forEach((s, i) => {
      expect(s.name.value).toEqual(`Trims-${i}`)
    })
  })

  it('Should be able to list the trims by creation date in order descending', async () => {
    for (let i = 0; i <= 10; i++) {
      const name = Text.create(`trims-${i}`, 'Pascalcase')

      const trims = makeTrims.execute({
        name,
        createdAt: new Date(2024, 0, i + i),
      })

      await trimsRepository.create(trims)
    }

    const response = await listTrims.execute({
      take: 100,
      order: 'desc',
      orderBy: 'createdAt',
    })

    response.value?.data.forEach((s, i) => {
      expect(s.name.value).toEqual(`Trims-${10 - i}`)
    })
  })
})
