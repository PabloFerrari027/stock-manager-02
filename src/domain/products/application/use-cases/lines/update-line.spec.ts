import { LinesRepository } from '../../repositories/lines-repository'
import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { UpdateLine } from './update-line'
import { container } from 'tsyringe'
import { faker } from '@faker-js/faker'
import { makeLine } from 'test/factories/products/make-line'
import { AlreadyExistsError } from '@/core/errors/already-exists-error'
import { Text } from '@/core/entities/text'
import { NotFoundError } from '@/core/errors/not-found-error'

let updateLine: UpdateLine
let linesRepository: LinesRepository

describe('Update Line', () => {
  beforeEach(() => {
    linesRepository = MakeAllRepositories.products.LinesRepository
    updateLine = container.resolve(UpdateLine)
  })

  it('Should to be able to update a line', async () => {
    const name = Text.create(faker.person.fullName(), 'Pascalcase').value

    const line = makeLine.execute({})

    await linesRepository.create(line)

    const response = await updateLine.execute({
      id: line.id.toString(),
      name,
    })

    expect(response.isRight()).toBeTruthy()

    const { data } = await linesRepository.list({})

    expect(data[0].name.value).toEqual(name)
  })

  it('Should to be able to throw error if the line is not found', async () => {
    const response = await updateLine.execute({
      id: 'line-1',
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(NotFoundError)
  })

  it('Should to be able to throw error if the name already exists', async () => {
    const name = Text.create(faker.person.fullName(), 'Pascalcase')

    const line = makeLine.execute({
      name,
    })

    await linesRepository.create(line)

    const response = await updateLine.execute({
      id: line.id.toString(),
      name: name.value,
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(AlreadyExistsError)
  })
})
