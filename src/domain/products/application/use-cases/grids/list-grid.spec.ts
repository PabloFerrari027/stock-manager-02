import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { ListGrids } from './list-grid'
import { container } from 'tsyringe'
import { makeGrid } from 'test/factories/products/make-grid'
import { Grid } from '../../../enterprise/entities/grid'
import { GridsRepository } from '../../repositories/grids-repository'
import { Text } from '@/core/entities/text'

let listGrids: ListGrids
let gridsRepository: GridsRepository

describe('List Grid', () => {
  beforeEach(() => {
    gridsRepository = MakeAllRepositories.products.GridsRepository
    listGrids = container.resolve(ListGrids)
  })

  it('Should to be able to list grids', async () => {
    for (let i = 0; i < 10; i++) {
      const grid = makeGrid.execute({})

      await gridsRepository.create(grid)
    }

    const response = await listGrids.execute({ take: 100 })

    expect(response.isRight()).toBeTruthy()

    expect(response.value?.data).toHaveLength(10)

    expect(response.value).toEqual({
      hasNext: false,
      data: expect.arrayContaining([expect.any(Grid)]),
    })
  })

  it('Should be able to list the grids by creation date in order ascending', async () => {
    for (let i = 0; i <= 10; i++) {
      const name = Text.create(`grid-${i}`, 'Pascalcase')

      const grid = makeGrid.execute({
        name,
        createdAt: new Date(2024, 0, i + i),
      })

      await gridsRepository.create(grid)
    }

    const response = await listGrids.execute({
      take: 100,
      order: 'asc',
      orderBy: 'createdAt',
    })

    response.value?.data.forEach((s, i) => {
      expect(s.name.value).toEqual(`Grid-${i}`)
    })
  })

  it('Should be able to list the grids by creation date in order descending', async () => {
    for (let i = 0; i <= 10; i++) {
      const name = Text.create(`grid-${i}`, 'Pascalcase')

      const grid = makeGrid.execute({
        name,
        createdAt: new Date(2024, 0, i + i),
      })

      await gridsRepository.create(grid)
    }

    const response = await listGrids.execute({
      take: 100,
      order: 'desc',
      orderBy: 'createdAt',
    })

    response.value?.data.forEach((s, i) => {
      expect(s.name.value).toEqual(`Grid-${10 - i}`)
    })
  })
})
