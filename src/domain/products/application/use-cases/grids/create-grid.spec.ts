import { GridsRepository } from '../../repositories/grids-repository'
import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { CreateGrid } from './create-grid'
import { container } from 'tsyringe'
import { faker } from '@faker-js/faker'
import { makeGrid } from 'test/factories/products/make-grid'
import { AlreadyExistsError } from '@/core/errors/already-exists-error'
import { Text } from '@/core/entities/text'

let createGrid: CreateGrid
let gridsRepository: GridsRepository

describe('Create Grid', () => {
  beforeEach(() => {
    gridsRepository = MakeAllRepositories.products.GridsRepository
    createGrid = container.resolve(CreateGrid)
  })

  it('Should to be able to create a grid', async () => {
    const name = Text.create(faker.person.fullName(), 'Pascalcase').value

    const response = await createGrid.execute({
      name,
    })

    expect(response.isRight()).toBeTruthy()

    const { data } = await gridsRepository.list({})

    expect(data[0].name.value).toEqual(name)
  })

  it('Should to be able to throw error if the name already exists', async () => {
    const name = Text.create(faker.person.fullName(), 'Pascalcase')

    const grid = makeGrid.execute({ name })

    await gridsRepository.create(grid)

    const response = await createGrid.execute({
      name: name.value,
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(AlreadyExistsError)
  })
})
