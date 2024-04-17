import { GridsRepository } from '../../repositories/grids-repository'
import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { UpdateGrid } from './update-grid'
import { container } from 'tsyringe'
import { faker } from '@faker-js/faker'
import { makeGrid } from 'test/factories/products/make-grid'
import { AlreadyExistsError } from '@/core/errors/already-exists-error'
import { Text } from '@/core/entities/text'
import { NotFoundError } from '@/core/errors/not-found-error'

let updateGrid: UpdateGrid
let gridsRepository: GridsRepository

describe('Update Grid', () => {
  beforeEach(() => {
    gridsRepository = MakeAllRepositories.products.GridsRepository
    updateGrid = container.resolve(UpdateGrid)
  })

  it('Should to be able to update a grid', async () => {
    const name = Text.create(faker.person.fullName(), 'Pascalcase').value

    const grid = makeGrid.execute({})

    await gridsRepository.create(grid)

    const response = await updateGrid.execute({
      id: grid.id.toString(),
      name,
    })

    expect(response.isRight()).toBeTruthy()

    const { data } = await gridsRepository.list({})

    expect(data[0].name.value).toEqual(name)
  })

  it('Should to be able to throw error if the grid is not found', async () => {
    const response = await updateGrid.execute({
      id: 'grid-1',
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(NotFoundError)
  })

  it('Should to be able to throw error if the name already exists', async () => {
    const name = Text.create(faker.person.fullName(), 'Pascalcase')

    const grid = makeGrid.execute({
      name,
    })

    await gridsRepository.create(grid)

    const response = await updateGrid.execute({
      id: grid.id.toString(),
      name: name.value,
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(AlreadyExistsError)
  })
})
