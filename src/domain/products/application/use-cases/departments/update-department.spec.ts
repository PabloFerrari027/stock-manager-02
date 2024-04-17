import { DepartmentsRepository } from '../../repositories/departments-repository'
import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { UpdateDepartment } from './update-department'
import { container } from 'tsyringe'
import { faker } from '@faker-js/faker'
import { makeDepartment } from 'test/factories/products/make-department'
import { AlreadyExistsError } from '@/core/errors/already-exists-error'
import { Text } from '@/core/entities/text'
import { NotFoundError } from '@/core/errors/not-found-error'

let updateDepartment: UpdateDepartment
let departmentsRepository: DepartmentsRepository

describe('Update Department', () => {
  beforeEach(() => {
    departmentsRepository = MakeAllRepositories.products.DepartmentsRepository
    updateDepartment = container.resolve(UpdateDepartment)
  })

  it('Should to be able to update a department', async () => {
    const name = Text.create(faker.person.fullName(), 'Pascalcase').value

    const department = makeDepartment.execute({})

    await departmentsRepository.create(department)

    const response = await updateDepartment.execute({
      id: department.id.toString(),
      name,
    })

    expect(response.isRight()).toBeTruthy()

    const { data } = await departmentsRepository.list({})

    expect(data[0].name.value).toEqual(name)
  })

  it('Should to be able to throw error if the department is not found', async () => {
    const response = await updateDepartment.execute({
      id: 'department-1',
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(NotFoundError)
  })

  it('Should to be able to throw error if the name already exists', async () => {
    const name = Text.create(faker.person.fullName(), 'Pascalcase')

    const department = makeDepartment.execute({
      name,
    })

    await departmentsRepository.create(department)

    const response = await updateDepartment.execute({
      id: department.id.toString(),
      name: name.value,
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(AlreadyExistsError)
  })
})
