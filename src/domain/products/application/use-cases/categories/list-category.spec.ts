import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { ListCategories } from './list-category'
import { container } from 'tsyringe'
import { makeCategory } from 'test/factories/products/make-category'
import { Category } from '../../../enterprise/entities/category'
import { CategoriesRepository } from '../../repositories/categories-repository'
import { Text } from '@/core/entities/text'

let listCategories: ListCategories
let categoriesRepository: CategoriesRepository

describe('List Category', () => {
  beforeEach(() => {
    categoriesRepository = MakeAllRepositories.products.CategoriesRepository
    listCategories = container.resolve(ListCategories)
  })

  it('Should to be able to list categories', async () => {
    for (let i = 0; i < 10; i++) {
      const category = makeCategory.execute({})

      await categoriesRepository.create(category)
    }

    const response = await listCategories.execute({ take: 100 })

    expect(response.isRight()).toBeTruthy()

    expect(response.value?.data).toHaveLength(10)

    expect(response.value).toEqual({
      hasNext: false,
      data: expect.arrayContaining([expect.any(Category)]),
    })
  })

  it('Should be able to list the categories by creation date in order ascending', async () => {
    for (let i = 0; i <= 10; i++) {
      const name = Text.create(`category-${i}`, 'Pascalcase')

      const category = makeCategory.execute({
        name,
        createdAt: new Date(2024, 0, i + i),
      })

      await categoriesRepository.create(category)
    }

    const response = await listCategories.execute({
      take: 100,
      order: 'asc',
      orderBy: 'createdAt',
    })

    response.value?.data.forEach((s, i) => {
      expect(s.name.value).toEqual(`Category-${i}`)
    })
  })

  it('Should be able to list the categories by creation date in order descending', async () => {
    for (let i = 0; i <= 10; i++) {
      const name = Text.create(`category-${i}`, 'Pascalcase')

      const category = makeCategory.execute({
        name,
        createdAt: new Date(2024, 0, i + i),
      })

      await categoriesRepository.create(category)
    }

    const response = await listCategories.execute({
      take: 100,
      order: 'desc',
      orderBy: 'createdAt',
    })

    response.value?.data.forEach((s, i) => {
      expect(s.name.value).toEqual(`Category-${10 - i}`)
    })
  })
})
