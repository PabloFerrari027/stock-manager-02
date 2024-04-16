import { DepartmentsRepository } from '../../repositories/departments-repository'
import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { container } from 'tsyringe'
import { faker } from '@faker-js/faker'
import { UsersRepository } from '../../repositories/users-repository'
import { makeRole } from 'test/factories/make-role'
import { makeDepartment } from 'test/factories/make-department'
import { RolesRepository } from '../../repositories/roles-repository'
import { NotFoundError } from '@/core/errors/not-found-error'
import { makeUser } from 'test/factories/make-user'
import { UpdateUser } from './update-user'
import { Text } from '@/core/entities/text'

let updateUser: UpdateUser
let usersRepository: UsersRepository
let departmentsRepository: DepartmentsRepository
let rolesRepository: RolesRepository

describe('Update User', () => {
  beforeEach(() => {
    usersRepository = MakeAllRepositories.UsersRepository
    departmentsRepository = MakeAllRepositories.DepartmentsRepository
    rolesRepository = MakeAllRepositories.RolesRepository
    updateUser = container.resolve(UpdateUser)
  })

  it('Should to be able to update a user', async () => {
    const user = makeUser.execute({})

    await usersRepository.create(user)

    const role = makeRole.execute({})

    await rolesRepository.create(role)

    const department = makeDepartment.execute({})

    await departmentsRepository.create(department)

    const name = Text.create(faker.person.fullName(), 'Pascalcase').value

    const response = await updateUser.execute({
      name,
      id: user.id.toString(),
      departmentId: department.id.toString(),
      roleId: role.id.toString(),
    })

    expect(response.isRight()).toBeTruthy()

    const { data } = await usersRepository.list({})

    expect(data[0].name.value).toEqual(name)
    expect(data[0].departmentId).toEqual(department.id)
    expect(data[0].roleId).toEqual(role.id)
  })

  it('Should to be able to throw error if the department is not found', async () => {
    const user = makeUser.execute({})

    const role = makeRole.execute({})

    await rolesRepository.create(role)

    const department = makeDepartment.execute({})

    await departmentsRepository.create(department)

    const name = faker.company.name()

    const response = await updateUser.execute({
      name,
      id: user.id.toString(),
      departmentId: department.id.toString(),
      roleId: role.id.toString(),
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(NotFoundError)
  })

  it('Should to be able to throw error if the role is not found', async () => {
    const user = makeUser.execute({})

    await usersRepository.create(user)

    const role = makeRole.execute({})

    const department = makeDepartment.execute({})

    await departmentsRepository.create(department)

    const name = faker.company.name()

    const response = await updateUser.execute({
      name,
      id: user.id.toString(),
      departmentId: department.id.toString(),
      roleId: role.id.toString(),
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(NotFoundError)
  })
})
