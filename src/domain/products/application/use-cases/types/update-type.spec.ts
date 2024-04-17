import { TypesRepository } from '../../repositories/types-repository'
import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { UpdateType } from './update-type'
import { container } from 'tsyringe'
import { faker } from '@faker-js/faker'
import { makeType } from 'test/factories/products/make-type'
import { AlreadyExistsError } from '@/core/errors/already-exists-error'
import { Text } from '@/core/entities/text'
import { CategoriesRepository } from '../../repositories/categories-repository'
import { makeCategory } from 'test/factories/products/make-category'
import { NotFoundError } from '@/core/errors/not-found-error'

let updateType: UpdateType
let typesRepository: TypesRepository
let categoriesRepository: CategoriesRepository

describe('Update Type', () => {
  beforeEach(() => {
    typesRepository = MakeAllRepositories.products.TypesRepository
    categoriesRepository = MakeAllRepositories.products.CategoriesRepository
    updateType = container.resolve(UpdateType)
  })

  it('Should to be able to update a type', async () => {
    const category = makeCategory.execute({})

    await categoriesRepository.create(category)

    const name = Text.create(faker.person.fullName(), 'Pascalcase').value

    const type = makeType.execute({})

    await typesRepository.create(type)

    const response = await updateType.execute({
      id: type.id.toString(),
      name,
      categoryId: category.id.toString(),
    })

    expect(response.isRight()).toBeTruthy()

    const { data } = await typesRepository.list({})

    expect(data[0].name.value).toEqual(name)
    expect(data[0].categoryId).toEqual(category.id)
  })

  it('Should to be able to throw error if the type is not found', async () => {
    const response = await updateType.execute({
      id: 'type-1',
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(NotFoundError)
  })

  it('Should to be able to throw error if the name already exists', async () => {
    const name = Text.create(faker.person.fullName(), 'Pascalcase')

    const type = makeType.execute({
      name,
    })

    await typesRepository.create(type)

    const response = await updateType.execute({
      id: type.id.toString(),
      name: name.value,
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(AlreadyExistsError)
  })

  it('Should to be able to throw error if the category is not found', async () => {
    const name = Text.create(faker.person.fullName(), 'Pascalcase').value

    const type = makeType.execute({})

    await typesRepository.create(type)

    const response = await updateType.execute({
      id: type.id.toString(),
      categoryId: 'category-1',
      name,
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(NotFoundError)
  })
})
