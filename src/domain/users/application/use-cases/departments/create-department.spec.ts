import { DepartmentsRepository } from '../../repositories/departments-repository'
import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { CreateDepartment } from './create-department'
import { container } from 'tsyringe'
import { faker } from '@faker-js/faker'
import { makeDepartment } from 'test/factories/make-department'
import { AlreadyExistsError } from '@/core/errors/already-exists-error'
import { Text } from '@/core/entities/text'

let createDepartment: CreateDepartment
let departmentsRepository: DepartmentsRepository

describe('Create Department', () => {
  beforeEach(() => {
    departmentsRepository = MakeAllRepositories.DepartmentsRepository
    departmentsRepository = MakeAllRepositories.DepartmentsRepository
    createDepartment = container.resolve(CreateDepartment)
  })

  it('Should to be able to create a department', async () => {
    const name = Text.create(faker.person.fullName(), 'Pascalcase').value

    const response = await createDepartment.execute({
      name,
    })

    expect(response.isRight()).toBeTruthy()

    const { data } = await departmentsRepository.list({})

    expect(data[0].name.value).toEqual(name)
  })

  it('Should to be able to throw error if the name already exists', async () => {
    const name = Text.create(faker.person.fullName(), 'Pascalcase')

    const department = makeDepartment.execute({ name })

    await departmentsRepository.create(department)

    const response = await createDepartment.execute({
      name: name.value,
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(AlreadyExistsError)
  })
})
