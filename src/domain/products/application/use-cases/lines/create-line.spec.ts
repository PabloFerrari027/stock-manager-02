import { LinesRepository } from '../../repositories/lines-repository'
import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { CreateLine } from './create-line'
import { container } from 'tsyringe'
import { faker } from '@faker-js/faker'
import { makeLine } from 'test/factories/products/make-line'
import { AlreadyExistsError } from '@/core/errors/already-exists-error'
import { Text } from '@/core/entities/text'

let createLine: CreateLine
let linesRepository: LinesRepository

describe('Create Line', () => {
  beforeEach(() => {
    linesRepository = MakeAllRepositories.products.LinesRepository
    createLine = container.resolve(CreateLine)
  })

  it('Should to be able to create a line', async () => {
    const name = Text.create(faker.person.fullName(), 'Pascalcase').value

    const response = await createLine.execute({
      name,
    })

    expect(response.isRight()).toBeTruthy()

    const { data } = await linesRepository.list({})

    expect(data[0].name.value).toEqual(name)
  })

  it('Should to be able to throw error if the name already exists', async () => {
    const name = Text.create(faker.person.fullName(), 'Pascalcase')

    const line = makeLine.execute({ name })

    await linesRepository.create(line)

    const response = await createLine.execute({
      name: name.value,
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(AlreadyExistsError)
  })
})
