import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { FindLine } from './find-line'
import { container } from 'tsyringe'
import { makeLine } from 'test/factories/products/make-line'
import { LinesRepository } from '../../repositories/lines-repository'

let findLine: FindLine
let linesRepository: LinesRepository

describe('Find Line', () => {
  beforeEach(() => {
    linesRepository = MakeAllRepositories.products.LinesRepository
    findLine = container.resolve(FindLine)
  })

  it('Should to be able to find a line', async () => {
    const line = makeLine.execute({})

    await linesRepository.create(line)

    const response = await findLine.execute({
      id: line.id.toString(),
    })

    expect(response.isRight()).toBeTruthy()
    expect(line).toEqual(response.value?.line)
  })

  it('Should to be able to throw error if the line is not found', async () => {
    const response = await findLine.execute({
      id: 'line-1',
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value?.line).not.toBeTruthy()
  })
})
