import { makeType } from 'test/factories/products/make-type'
import { TypesRepository } from '../../repositories/types-repository'
import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { CreateType } from './create-type'
import { container } from 'tsyringe'
import { faker } from '@faker-js/faker'
import { AlreadyExistsError } from '@/core/errors/already-exists-error'
import { Text } from '@/core/entities/text'
import { CategoriesRepository } from '../../repositories/categories-repository'
import { makeCategory } from 'test/factories/products/make-category'
import { NotFoundError } from '@/core/errors/not-found-error'
import { NotAcceptableError } from '@/core/errors/not-acceptable-error'

let createType: CreateType
let typesRepository: TypesRepository
let categoriesRepository: CategoriesRepository

describe('Create Type', () => {
  beforeEach(() => {
    typesRepository = MakeAllRepositories.products.TypesRepository
    categoriesRepository = MakeAllRepositories.products.CategoriesRepository
    createType = container.resolve(CreateType)
  })

  it('Should to be able to create a type', async () => {
    const category = makeCategory.execute({})

    await categoriesRepository.create(category)

    const name = Text.create(faker.person.fullName(), 'Pascalcase').value

    const response = await createType.execute({
      name,
      categoryId: category.id.toString(),
      SKUPrefix: faker.science.chemicalElement().symbol,
    })

    expect(response.isRight()).toBeTruthy()

    const { data } = await typesRepository.list({})

    expect(data[0].name.value).toEqual(name)
    expect(data[0].categoryId).toEqual(category.id)
  })

  it('Should to be able to throw error if the SKU prefix has number in your value', async () => {
    const category = makeCategory.execute({})

    await categoriesRepository.create(category)

    const name = Text.create(faker.person.fullName(), 'Pascalcase').value

    const response = await createType.execute({
      name,
      categoryId: category.id.toString(),
      SKUPrefix: '00',
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(NotAcceptableError)
  })

  it('Should to be able to throw error if the SKU prefix has length is bigger then 2', async () => {
    const category = makeCategory.execute({})

    await categoriesRepository.create(category)

    const name = Text.create(faker.person.fullName(), 'Pascalcase').value

    const response = await createType.execute({
      name,
      categoryId: category.id.toString(),
      SKUPrefix: 'AAA',
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(NotAcceptableError)
  })

  it('Should to be able to throw error if the SKU prefix has length is less than 2', async () => {
    const category = makeCategory.execute({})

    await categoriesRepository.create(category)

    const name = Text.create(faker.person.fullName(), 'Pascalcase').value

    const response = await createType.execute({
      name,
      categoryId: category.id.toString(),
      SKUPrefix: 'A',
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(NotAcceptableError)
  })

  it('Should to be able to throw error if the name already exists', async () => {
    const category = makeCategory.execute({})

    await categoriesRepository.create(category)

    const name = Text.create(faker.person.fullName(), 'Pascalcase')

    const type = makeType.execute({ name })

    await typesRepository.create(type)

    const response = await createType.execute({
      name: name.value,
      categoryId: category.id.toString(),
      SKUPrefix: faker.science.chemicalElement().symbol,
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(AlreadyExistsError)
  })

  it('Should to be able to throw error if the category is not found', async () => {
    const name = Text.create(faker.person.fullName(), 'Pascalcase').value

    const response = await createType.execute({
      name,
      categoryId: 'category-1',
      SKUPrefix: faker.science.chemicalElement().symbol,
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(NotFoundError)
  })
})
