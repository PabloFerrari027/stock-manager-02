import { LevelsRepository } from '../../repositories/levels-repository'
import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { UpdateLevel } from './update-level'
import { container } from 'tsyringe'
import { faker } from '@faker-js/faker'
import { makeLevel } from 'test/factories/products/make-level'
import { Text } from '@/core/entities/text'
import { TypesRepository } from '../../repositories/types-repository'
import { makeType } from 'test/factories/products/make-type'
import { NotFoundError } from '@/core/errors/not-found-error'

let updateLevel: UpdateLevel
let levelsRepository: LevelsRepository
let typesRepository: TypesRepository

describe('Update Level', () => {
  beforeEach(() => {
    levelsRepository = MakeAllRepositories.products.LevelsRepository
    typesRepository = MakeAllRepositories.products.TypesRepository
    updateLevel = container.resolve(UpdateLevel)
  })

  it('Should to be able to update a level', async () => {
    const type = makeType.execute({})

    await typesRepository.create(type)

    const name = Text.create(faker.person.fullName(), 'Pascalcase').value

    const level = makeLevel.execute({})

    await levelsRepository.create(level)

    const response = await updateLevel.execute({
      id: level.id.toString(),
      name,
      typeId: type.id.toString(),
      multiBrandPrice: faker.number.float(),
      retailPrice: faker.number.float(),
      salePrice: faker.number.float(),
      targetCost: faker.number.float(),
    })

    expect(response.isRight()).toBeTruthy()

    const { data } = await levelsRepository.list({})

    expect(data[0].name.value).toEqual(name)
    expect(data[0].typeId).toEqual(type.id)
  })

  it('Should to be able to throw error if the level is not found', async () => {
    const response = await updateLevel.execute({
      id: 'level-1',
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(NotFoundError)
  })

  it('Should to be able to throw error if the level is not found', async () => {
    const response = await updateLevel.execute({
      id: 'type-1',
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(NotFoundError)
  })

  it('Should to be able to throw error if the type is not found', async () => {
    const name = Text.create(faker.person.fullName(), 'Pascalcase').value

    const level = makeLevel.execute({})

    await levelsRepository.create(level)

    const response = await updateLevel.execute({
      name,
      id: level.id.toString(),
      typeId: 'type-1',
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(NotFoundError)
  })
})
