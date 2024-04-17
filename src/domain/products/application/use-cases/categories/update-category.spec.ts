import { CategoriesRepository } from '../../repositories/categories-repository'
import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { UpdateCategory } from './update-category'
import { container } from 'tsyringe'
import { faker } from '@faker-js/faker'
import { makeCategory } from 'test/factories/products/make-category'
import { AlreadyExistsError } from '@/core/errors/already-exists-error'
import { Text } from '@/core/entities/text'
import { NotFoundError } from '@/core/errors/not-found-error'

let updateCategory: UpdateCategory
let categoriesRepository: CategoriesRepository

describe('Update Category', () => {
  beforeEach(() => {
    categoriesRepository = MakeAllRepositories.products.CategoriesRepository
    updateCategory = container.resolve(UpdateCategory)
  })

  it('Should to be able to update a category', async () => {
    const name = Text.create(faker.person.fullName(), 'Pascalcase').value

    const category = makeCategory.execute({})

    await categoriesRepository.create(category)

    const response = await updateCategory.execute({
      id: category.id.toString(),
      name,
    })

    expect(response.isRight()).toBeTruthy()

    const { data } = await categoriesRepository.list({})

    expect(data[0].name.value).toEqual(name)
  })

  it('Should to be able to throw error if the category is not found', async () => {
    const response = await updateCategory.execute({
      id: 'category-1',
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(NotFoundError)
  })

  it('Should to be able to throw error if the name already exists', async () => {
    const name = Text.create(faker.person.fullName(), 'Pascalcase')

    const category = makeCategory.execute({
      name,
    })

    await categoriesRepository.create(category)

    const response = await updateCategory.execute({
      id: category.id.toString(),
      name: name.value,
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(AlreadyExistsError)
  })
})
