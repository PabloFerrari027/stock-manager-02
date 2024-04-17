import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { FindGrid } from './find-grid'
import { container } from 'tsyringe'
import { makeGrid } from 'test/factories/products/make-grid'
import { GridsRepository } from '../../repositories/grids-repository'

let findGrid: FindGrid
let gridsRepository: GridsRepository

describe('Find Grid', () => {
  beforeEach(() => {
    gridsRepository = MakeAllRepositories.products.GridsRepository
    findGrid = container.resolve(FindGrid)
  })

  it('Should to be able to find a grid', async () => {
    const grid = makeGrid.execute({})

    await gridsRepository.create(grid)

    const response = await findGrid.execute({
      id: grid.id.toString(),
    })

    expect(response.isRight()).toBeTruthy()
    expect(grid).toEqual(response.value?.grid)
  })

  it('Should to be able to throw error if the grid is not found', async () => {
    const response = await findGrid.execute({
      id: 'grid-1',
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value?.grid).not.toBeTruthy()
  })
})
