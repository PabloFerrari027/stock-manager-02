import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { ListRoles } from './list-roles'
import { container } from 'tsyringe'
import { makeRole } from 'test/factories/users/make-role'
import { Role } from '../../../enterprise/entities/role'
import { RolesRepository } from '../../repositories/roles-repository'
import { Text } from '@/core/entities/text'

let listRoles: ListRoles
let rolesRepository: RolesRepository

describe('List Role', () => {
  beforeEach(() => {
    rolesRepository = MakeAllRepositories.users.RolesRepository
    listRoles = container.resolve(ListRoles)
  })

  it('Should to be able to list roles', async () => {
    for (let i = 0; i < 10; i++) {
      const role = makeRole.execute({})

      await rolesRepository.create(role)
    }

    const response = await listRoles.execute({ take: 100 })

    expect(response.isRight()).toBeTruthy()

    expect(response.value?.data).toHaveLength(10)

    expect(response.value).toEqual({
      hasNext: false,
      data: expect.arrayContaining([expect.any(Role)]),
    })
  })

  it('Should be able to list the roles by creation date in order ascending', async () => {
    for (let i = 0; i <= 10; i++) {
      const name = Text.create(`role-${i}`, 'Pascalcase')

      const role = makeRole.execute({
        name,
        createdAt: new Date(2024, 0, i + i),
      })

      await rolesRepository.create(role)
    }

    const response = await listRoles.execute({
      take: 100,
      order: 'asc',
      orderBy: 'createdAt',
    })

    response.value?.data.forEach((s, i) => {
      expect(s.name.value).toEqual(`Role-${i}`)
    })
  })

  it('Should be able to list the roles by creation date in order descending', async () => {
    for (let i = 0; i <= 10; i++) {
      const name = Text.create(`role-${i}`, 'Pascalcase')

      const role = makeRole.execute({
        name,
        createdAt: new Date(2024, 0, i + i),
      })

      await rolesRepository.create(role)
    }

    const response = await listRoles.execute({
      take: 100,
      order: 'desc',
      orderBy: 'createdAt',
    })

    response.value?.data.forEach((s, i) => {
      expect(s.name.value).toEqual(`Role-${10 - i}`)
    })
  })
})
