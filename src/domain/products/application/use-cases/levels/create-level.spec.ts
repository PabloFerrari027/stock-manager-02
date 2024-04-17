import { LevelsRepository } from '../../repositories/levels-repository'
import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { CreateLevel } from './create-level'
import { container } from 'tsyringe'
import { faker } from '@faker-js/faker'
import { Text } from '@/core/entities/text'
import { TypesRepository } from '../../repositories/types-repository'
import { makeType } from 'test/factories/products/make-type'
import { NotFoundError } from '@/core/errors/not-found-error'

let createLevel: CreateLevel
let levelsRepository: LevelsRepository
let typesRepository: TypesRepository

describe('Create Level', () => {
  beforeEach(() => {
    levelsRepository = MakeAllRepositories.products.LevelsRepository
    typesRepository = MakeAllRepositories.products.TypesRepository
    createLevel = container.resolve(CreateLevel)
  })

  it('Should to be able to create a level', async () => {
    const type = makeType.execute({})

    await typesRepository.create(type)

    const name = Text.create(faker.person.fullName(), 'Pascalcase').value

    const response = await createLevel.execute({
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
    expect(data[0].multiBrandPrice).toEqual(expect.any(Number))
    expect(data[0].retailPrice).toEqual(expect.any(Number))
    expect(data[0].salePrice).toEqual(expect.any(Number))
    expect(data[0].targetCost).toEqual(expect.any(Number))
  })

  it('Should to be able to throw error if the type is not found', async () => {
    const name = Text.create(faker.person.fullName(), 'Pascalcase').value

    const response = await createLevel.execute({
      name,
      typeId: 'type-1',
      multiBrandPrice: faker.number.float(),
      retailPrice: faker.number.float(),
      salePrice: faker.number.float(),
      targetCost: faker.number.float(),
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(NotFoundError)
  })
})
