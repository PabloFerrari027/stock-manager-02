import { DepartmentsRepository } from '../../repositories/departments-repository'
import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { CreateUser } from './create-user'
import { container } from 'tsyringe'
import { faker } from '@faker-js/faker'
import { UsersRepository } from '../../repositories/users-repository'
import { makeRole } from 'test/factories/users/make-role'
import { makeDepartment } from 'test/factories/users/make-department'
import { RolesRepository } from '../../repositories/roles-repository'
import { NotFoundError } from '@/core/errors/not-found-error'
import { makeUser } from 'test/factories/users/make-user'
import { AlreadyExistsError } from '@/core/errors/already-exists-error'
import { Text } from '@/core/entities/text'

let createUser: CreateUser
let usersRepository: UsersRepository
let departmentsRepository: DepartmentsRepository
let rolesRepository: RolesRepository

describe('Create User', () => {
  beforeEach(() => {
    usersRepository = MakeAllRepositories.users.UsersRepository
    departmentsRepository = MakeAllRepositories.users.DepartmentsRepository
    rolesRepository = MakeAllRepositories.users.RolesRepository
    createUser = container.resolve(CreateUser)
  })

  it('Should to be able to create a user', async () => {
    const name = Text.create(faker.person.fullName(), 'Pascalcase').value

    const role = makeRole.execute({})

    await rolesRepository.create(role)

    const department = makeDepartment.execute({})

    await departmentsRepository.create(department)

    const email = faker.internet.email()

    const response = await createUser.execute({
      name,
      email,
      authProvider: 'google',
      departmentId: department.id.toString(),
      roleId: role.id.toString(),
    })

    expect(response.isRight()).toBeTruthy()

    const { data } = await usersRepository.list({})

    expect(data[0].name.value).toEqual(name)
    expect(data[0].departmentId).toEqual(department.id)
    expect(data[0].roleId).toEqual(role.id)
    expect(data[0].authProvider).toEqual('google')
    expect(data[0].email).toEqual(email)
  })

  it('Should to be able to throw error if the email already exists', async () => {
    const user = makeUser.execute({})

    await usersRepository.create(user)

    const role = makeRole.execute({})

    await rolesRepository.create(role)

    const department = makeDepartment.execute({})

    await departmentsRepository.create(department)

    const response = await createUser.execute({
      name: faker.company.name(),
      email: user.email,
      authProvider: 'google',
      departmentId: department.id.toString(),
      roleId: role.id.toString(),
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(AlreadyExistsError)
  })

  it('Should to be able to throw error if the department is not found', async () => {
    const role = makeRole.execute({})

    await rolesRepository.create(role)

    const department = makeDepartment.execute({})

    const response = await createUser.execute({
      name: faker.company.name(),
      email: faker.internet.email(),
      authProvider: 'google',
      departmentId: department.id.toString(),
      roleId: role.id.toString(),
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(NotFoundError)
  })

  it('Should to be able to throw error if the role is not found', async () => {
    const role = makeRole.execute({})

    const department = makeDepartment.execute({})

    await departmentsRepository.create(department)

    const response = await createUser.execute({
      name: faker.company.name(),
      email: faker.internet.email(),
      authProvider: 'google',
      departmentId: department.id.toString(),
      roleId: role.id.toString(),
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(NotFoundError)
  })
})
