import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { FindDepartment } from './find-department'
import { container } from 'tsyringe'
import { makeDepartment } from 'test/factories/products/make-department'
import { DepartmentsRepository } from '../../repositories/departments-repository'

let findDepartment: FindDepartment
let departmentsRepository: DepartmentsRepository

describe('Find Department', () => {
  beforeEach(() => {
    departmentsRepository = MakeAllRepositories.products.DepartmentsRepository
    findDepartment = container.resolve(FindDepartment)
  })

  it('Should to be able to find a department', async () => {
    const department = makeDepartment.execute({})

    await departmentsRepository.create(department)

    const response = await findDepartment.execute({
      id: department.id.toString(),
    })

    expect(response.isRight()).toBeTruthy()
    expect(department).toEqual(response.value?.department)
  })

  it('Should to be able to throw error if the department is not found', async () => {
    const response = await findDepartment.execute({
      id: 'department-1',
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value?.department).not.toBeTruthy()
  })
})
