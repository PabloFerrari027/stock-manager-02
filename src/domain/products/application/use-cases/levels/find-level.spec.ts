import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { FindLevel } from './find-level'
import { container } from 'tsyringe'
import { makeLevel } from 'test/factories/products/make-level'
import { LevelsRepository } from '../../repositories/levels-repository'

let findLevel: FindLevel
let levelsRepository: LevelsRepository

describe('Find Level', () => {
  beforeEach(() => {
    levelsRepository = MakeAllRepositories.products.LevelsRepository
    findLevel = container.resolve(FindLevel)
  })

  it('Should to be able to find a level', async () => {
    const level = makeLevel.execute({})

    await levelsRepository.create(level)

    const response = await findLevel.execute({
      id: level.id.toString(),
    })

    expect(response.isRight()).toBeTruthy()
    expect(level).toEqual(response.value?.level)
  })

  it('Should to be able to throw error if the level is not found', async () => {
    const response = await findLevel.execute({
      id: 'level-1',
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value?.level).not.toBeTruthy()
  })
})
