import { DepartmentsRepository } from '../../repositories/departments-repository'
import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { UpdateRole } from './update-role'
import { container } from 'tsyringe'
import { faker } from '@faker-js/faker'
import { makeDepartment } from 'test/factories/users/make-department'
import { RolesRepository } from '../../repositories/roles-repository'
import { NotFoundError } from '@/core/errors/not-found-error'
import { makeRole } from 'test/factories/users/make-role'
import { AlreadyExistsError } from '@/core/errors/already-exists-error'
import { Text } from '@/core/entities/text'

let updateRole: UpdateRole
let departmentsRepository: DepartmentsRepository
let rolesRepository: RolesRepository

describe('Update Role', () => {
  beforeEach(() => {
    departmentsRepository = MakeAllRepositories.users.DepartmentsRepository
    rolesRepository = MakeAllRepositories.users.RolesRepository
    updateRole = container.resolve(UpdateRole)
  })

  it('Should to be able to update a role', async () => {
    const role = makeRole.execute({})

    await rolesRepository.create(role)

    const name = Text.create(faker.person.fullName(), 'Pascalcase').value

    const department = makeDepartment.execute({})

    await departmentsRepository.create(department)

    const response = await updateRole.execute({
      id: role.id.toString(),
      name,
      departmentId: department.id.toString(),
      permittedRoutes: [faker.internet.url()],
    })

    expect(response.isRight()).toBeTruthy()

    const { data } = await rolesRepository.list({})

    expect(data[0].name.value).toEqual(name)
    expect(data[0].departmentId).toEqual(department.id)
    expect(data[0].permittedRoutes).toEqual([expect.any(String)])
  })

  it('Should to be able to throw error if the name already exists', async () => {
    const name = Text.create(faker.person.fullName(), 'Pascalcase')

    const role = makeRole.execute({
      name,
    })

    await rolesRepository.create(role)

    const department = makeDepartment.execute({})

    await departmentsRepository.create(department)

    const response = await updateRole.execute({
      id: role.id.toString(),
      name: name.value,
      departmentId: department.id.toString(),
      permittedRoutes: [faker.internet.url()],
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(AlreadyExistsError)
  })

  it('Should to be able to throw error if the role is not found', async () => {
    const response = await updateRole.execute({
      id: 'role-1',
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(NotFoundError)
  })

  it('Should to be able to throw error if the department is not found', async () => {
    const role = makeRole.execute({})

    await rolesRepository.create(role)

    const department = makeDepartment.execute({})

    const response = await updateRole.execute({
      id: role.id.toString(),
      name: faker.company.name(),
      departmentId: department.id.toString(),
      permittedRoutes: [faker.internet.url()],
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(NotFoundError)
  })
})
