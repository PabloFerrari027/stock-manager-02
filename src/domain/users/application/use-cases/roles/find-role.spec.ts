import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { FindRole } from './find-role'
import { container } from 'tsyringe'
import { makeRole } from 'test/factories/users/make-role'
import { RolesRepository } from '../../repositories/roles-repository'

let findRole: FindRole
let rolesRepository: RolesRepository

describe('Find Role', () => {
  beforeEach(() => {
    rolesRepository = MakeAllRepositories.users.RolesRepository
    findRole = container.resolve(FindRole)
  })

  it('Should to be able to find a role', async () => {
    const role = makeRole.execute({})

    await rolesRepository.create(role)

    const response = await findRole.execute({
      id: role.id.toString(),
    })

    expect(response.isRight()).toBeTruthy()
    expect(role).toEqual(response.value?.role)
  })

  it('Should to be able to throw error if the role is not found', async () => {
    const response = await findRole.execute({
      id: 'role-1',
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value?.role).not.toBeTruthy()
  })
})
