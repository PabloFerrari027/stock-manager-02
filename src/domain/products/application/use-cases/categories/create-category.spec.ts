import { CategoriesRepository } from '../../repositories/categories-repository'
import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { CreateCategory } from './create-category'
import { container } from 'tsyringe'
import { faker } from '@faker-js/faker'
import { makeCategory } from 'test/factories/products/make-category'
import { AlreadyExistsError } from '@/core/errors/already-exists-error'
import { Text } from '@/core/entities/text'

let createCategory: CreateCategory
let categoriesRepository: CategoriesRepository

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepository = MakeAllRepositories.products.CategoriesRepository
    createCategory = container.resolve(CreateCategory)
  })

  it('Should to be able to create a category', async () => {
    const name = Text.create(faker.person.fullName(), 'Pascalcase').value

    const response = await createCategory.execute({
      name,
    })

    expect(response.isRight()).toBeTruthy()

    const { data } = await categoriesRepository.list({})

    expect(data[0].name.value).toEqual(name)
  })

  it('Should to be able to throw error if the name already exists', async () => {
    const name = Text.create(faker.person.fullName(), 'Pascalcase')

    const category = makeCategory.execute({ name })

    await categoriesRepository.create(category)

    const response = await createCategory.execute({
      name: name.value,
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(AlreadyExistsError)
  })
})
