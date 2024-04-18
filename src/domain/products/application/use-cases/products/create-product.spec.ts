import { ProductsRepository } from '../../repositories/products-repository'
import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { CreateProduct } from './create-product'
import { container } from 'tsyringe'
import { faker } from '@faker-js/faker'
import { makeProduct } from 'test/factories/products/make-product'
import { AlreadyExistsError } from '@/core/errors/already-exists-error'
import { Text } from '@/core/entities/text'

let createProduct: CreateProduct
let productsRepository: ProductsRepository

describe('Create Product', () => {
  beforeEach(() => {
    productsRepository = MakeAllRepositories.products.ProductsRepository
    createProduct = container.resolve(CreateProduct)
  })

  it('Should to be able to create a product', async () => {
    const name = Text.create(faker.person.fullName(), 'Pascalcase').value

    const response = await createProduct.execute({
      name,
      categoryId,
      collectionIds,
      departmentId,
      gridId,
      levelId,
      lineId,
      typeId,
      variation,
      SKU,
    })

    expect(response.isRight()).toBeTruthy()

    const { data } = await productsRepository.list({})

    expect(data[0].name.value).toEqual(name)
  })
})
