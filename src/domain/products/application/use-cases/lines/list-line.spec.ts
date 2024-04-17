import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { ListLines } from './list-line'
import { container } from 'tsyringe'
import { makeLine } from 'test/factories/products/make-line'
import { Line } from '../../../enterprise/entities/line'
import { LinesRepository } from '../../repositories/lines-repository'
import { Text } from '@/core/entities/text'

let listLines: ListLines
let linesRepository: LinesRepository

describe('List Line', () => {
  beforeEach(() => {
    linesRepository = MakeAllRepositories.products.LinesRepository
    listLines = container.resolve(ListLines)
  })

  it('Should to be able to list lines', async () => {
    for (let i = 0; i < 10; i++) {
      const line = makeLine.execute({})

      await linesRepository.create(line)
    }

    const response = await listLines.execute({ take: 100 })

    expect(response.isRight()).toBeTruthy()

    expect(response.value?.data).toHaveLength(10)

    expect(response.value).toEqual({
      hasNext: false,
      data: expect.arrayContaining([expect.any(Line)]),
    })
  })

  it('Should be able to list the lines by creation date in order ascending', async () => {
    for (let i = 0; i <= 10; i++) {
      const name = Text.create(`line-${i}`, 'Pascalcase')

      const line = makeLine.execute({
        name,
        createdAt: new Date(2024, 0, i + i),
      })

      await linesRepository.create(line)
    }

    const response = await listLines.execute({
      take: 100,
      order: 'asc',
      orderBy: 'createdAt',
    })

    response.value?.data.forEach((s, i) => {
      expect(s.name.value).toEqual(`Line-${i}`)
    })
  })

  it('Should be able to list the lines by creation date in order descending', async () => {
    for (let i = 0; i <= 10; i++) {
      const name = Text.create(`line-${i}`, 'Pascalcase')

      const line = makeLine.execute({
        name,
        createdAt: new Date(2024, 0, i + i),
      })

      await linesRepository.create(line)
    }

    const response = await listLines.execute({
      take: 100,
      order: 'desc',
      orderBy: 'createdAt',
    })

    response.value?.data.forEach((s, i) => {
      expect(s.name.value).toEqual(`Line-${10 - i}`)
    })
  })
})
