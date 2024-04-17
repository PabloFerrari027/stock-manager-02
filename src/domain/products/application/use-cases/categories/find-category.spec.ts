import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { FindCategory } from './find-category'
import { container } from 'tsyringe'
import { makeCategory } from 'test/factories/products/make-category'
import { CategoriesRepository } from '../../repositories/categories-repository'

let findCategory: FindCategory
let categoriesRepository: CategoriesRepository

describe('Find Category', () => {
  beforeEach(() => {
    categoriesRepository = MakeAllRepositories.products.CategoriesRepository
    findCategory = container.resolve(FindCategory)
  })

  it('Should to be able to find a category', async () => {
    const category = makeCategory.execute({})

    await categoriesRepository.create(category)

    const response = await findCategory.execute({
      id: category.id.toString(),
    })

    expect(response.isRight()).toBeTruthy()
    expect(category).toEqual(response.value?.category)
  })

  it('Should to be able to throw error if the category is not found', async () => {
    const response = await findCategory.execute({
      id: 'category-1',
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value?.category).not.toBeTruthy()
  })
})
