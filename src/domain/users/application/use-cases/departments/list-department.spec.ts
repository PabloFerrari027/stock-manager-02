import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { ListDepartments } from './list-department'
import { container } from 'tsyringe'
import { makeDepartment } from 'test/factories/users/make-department'
import { Department } from '../../../enterprise/entities/department'
import { DepartmentsRepository } from '../../repositories/departments-repository'
import { Text } from '@/core/entities/text'

let listDepartments: ListDepartments
let departmentsRepository: DepartmentsRepository

describe('List Department', () => {
  beforeEach(() => {
    departmentsRepository = MakeAllRepositories.users.DepartmentsRepository
    listDepartments = container.resolve(ListDepartments)
  })

  it('Should to be able to list departments', async () => {
    for (let i = 0; i < 10; i++) {
      const department = makeDepartment.execute({})

      await departmentsRepository.create(department)
    }

    const response = await listDepartments.execute({ take: 100 })

    expect(response.isRight()).toBeTruthy()

    expect(response.value?.data).toHaveLength(10)

    expect(response.value).toEqual({
      hasNext: false,
      data: expect.arrayContaining([expect.any(Department)]),
    })
  })

  it('Should be able to list the departments by creation date in order ascending', async () => {
    for (let i = 0; i <= 10; i++) {
      const name = Text.create(`department-${i}`, 'Pascalcase')

      const department = makeDepartment.execute({
        name,
        createdAt: new Date(2024, 0, i + i),
      })

      await departmentsRepository.create(department)
    }

    const response = await listDepartments.execute({
      take: 100,
      order: 'asc',
      orderBy: 'createdAt',
    })

    response.value?.data.forEach((s, i) => {
      expect(s.name.value).toEqual(`Department-${i}`)
    })
  })

  it('Should be able to list the departments by creation date in order descending', async () => {
    for (let i = 0; i <= 10; i++) {
      const name = Text.create(`department-${i}`, 'Pascalcase')

      const department = makeDepartment.execute({
        name,
        createdAt: new Date(2024, 0, i + i),
      })

      await departmentsRepository.create(department)
    }

    const response = await listDepartments.execute({
      take: 100,
      order: 'desc',
      orderBy: 'createdAt',
    })

    response.value?.data.forEach((s, i) => {
      expect(s.name.value).toEqual(`Department-${10 - i}`)
    })
  })
})
