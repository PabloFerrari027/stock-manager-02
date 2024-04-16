import { TrimsRepository } from '@/domain/materials/application/repositories/trims-repository'
import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { UpdateTrims } from './update-trims'
import { container } from 'tsyringe'
import { makeTrims } from 'test/factories/make-trims'
import { NotFoundError } from '@/core/errors/not-found-error'
import { Text } from '@/core/entities/text'
import { faker } from '@faker-js/faker'

let updateTrims: UpdateTrims
let trimsRepository: TrimsRepository

describe('Update Trims', () => {
  beforeEach(() => {
    trimsRepository = MakeAllRepositories.TrimsRepository
    updateTrims = container.resolve(UpdateTrims)
  })

  it('Should to be able to update a trims', async () => {
    const trims = makeTrims.execute({})

    await trimsRepository.create(trims)

    const name = Text.create(
      faker.commerce.productMaterial(),
      'Pascalcase',
    ).value

    const response = await updateTrims.execute({
      id: trims.id.toString(),
      name,
    })

    expect(response.isRight()).toBeTruthy()

    const getTrims = await trimsRepository.findById(trims.id.toString())

    expect(getTrims?.name.value).toEqual(name)
  })

  it('Should to be able to throw error if the trims is not found', async () => {
    const response = await updateTrims.execute({
      id: 'trims-1',
      name: 'trims-1',
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(NotFoundError)
  })
})
