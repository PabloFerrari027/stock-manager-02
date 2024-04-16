import { TrimsRepository } from '@/domain/materials/application/repositories/trims-repository'
import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { FindTrims } from './find-trims'
import { container } from 'tsyringe'
import { makeTrims } from 'test/factories/make-trims'

let findTrims: FindTrims
let trimsRepository: TrimsRepository

describe('Find Trims', () => {
  beforeEach(() => {
    trimsRepository = MakeAllRepositories.TrimsRepository
    findTrims = container.resolve(FindTrims)
  })

  it('Should to be able to find a trims', async () => {
    const trims = makeTrims.execute({})

    await trimsRepository.create(trims)

    const response = await findTrims.execute({
      id: trims.id.toString(),
    })

    expect(response.isRight()).toBeTruthy()
    expect(trims).toEqual(response.value?.trims)
  })

  it('Should to be able to throw error if the trims is not found', async () => {
    const response = await findTrims.execute({
      id: 'trims-1',
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value?.trims).not.toBeTruthy()
  })
})
