import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { ListLevels } from './list-levels'
import { container } from 'tsyringe'
import { makeLevel } from 'test/factories/products/make-level'
import { Level } from '../../../enterprise/entities/level'
import { LevelsRepository } from '../../repositories/levels-repository'
import { Text } from '@/core/entities/text'

let listLevels: ListLevels
let levelsRepository: LevelsRepository

describe('List Level', () => {
  beforeEach(() => {
    levelsRepository = MakeAllRepositories.products.LevelsRepository
    listLevels = container.resolve(ListLevels)
  })

  it('Should to be able to list levels', async () => {
    for (let i = 0; i < 10; i++) {
      const level = makeLevel.execute({})

      await levelsRepository.create(level)
    }

    const response = await listLevels.execute({ take: 100 })

    expect(response.isRight()).toBeTruthy()

    expect(response.value?.data).toHaveLength(10)

    expect(response.value).toEqual({
      hasNext: false,
      data: expect.arrayContaining([expect.any(Level)]),
    })
  })

  it('Should be able to list the levels by creation date in order ascending', async () => {
    for (let i = 0; i <= 10; i++) {
      const name = Text.create(`level-${i}`, 'Pascalcase')

      const level = makeLevel.execute({
        name,
        createdAt: new Date(2024, 0, i + i),
      })

      await levelsRepository.create(level)
    }

    const response = await listLevels.execute({
      take: 100,
      order: 'asc',
      orderBy: 'createdAt',
    })

    response.value?.data.forEach((s, i) => {
      expect(s.name.value).toEqual(`Level-${i}`)
    })
  })

  it('Should be able to list the levels by creation date in order descending', async () => {
    for (let i = 0; i <= 10; i++) {
      const name = Text.create(`level-${i}`, 'Pascalcase')

      const level = makeLevel.execute({
        name,
        createdAt: new Date(2024, 0, i + i),
      })

      await levelsRepository.create(level)
    }

    const response = await listLevels.execute({
      take: 100,
      order: 'desc',
      orderBy: 'createdAt',
    })

    response.value?.data.forEach((s, i) => {
      expect(s.name.value).toEqual(`Level-${10 - i}`)
    })
  })
})
