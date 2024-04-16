import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { ListUsers } from './list-users'
import { container } from 'tsyringe'
import { makeUser } from 'test/factories/make-user'
import { User } from '../../../enterprise/entities/user'
import { UsersRepository } from '../../repositories/users-repository'
import { Text } from '@/core/entities/text'

let listUsers: ListUsers
let usersRepository: UsersRepository

describe('List User', () => {
  beforeEach(() => {
    usersRepository = MakeAllRepositories.UsersRepository
    listUsers = container.resolve(ListUsers)
  })

  it('Should to be able to list users', async () => {
    for (let i = 0; i < 10; i++) {
      const user = makeUser.execute({})

      await usersRepository.create(user)
    }

    const response = await listUsers.execute({ take: 100 })

    expect(response.isRight()).toBeTruthy()

    expect(response.value?.data).toHaveLength(10)

    expect(response.value).toEqual({
      hasNext: false,
      data: expect.arrayContaining([expect.any(User)]),
    })
  })

  it('Should be able to list the users by creation date in order ascending', async () => {
    for (let i = 0; i <= 10; i++) {
      const name = Text.create(`user-${i}`, 'Pascalcase')

      const user = makeUser.execute({
        name,
        createdAt: new Date(2024, 0, i + i),
      })

      await usersRepository.create(user)
    }

    const response = await listUsers.execute({
      take: 100,
      order: 'asc',
      orderBy: 'createdAt',
    })

    response.value?.data.forEach((s, i) => {
      expect(s.name.value).toEqual(`User-${i}`)
    })
  })

  it('Should be able to list the users by creation date in order descending', async () => {
    for (let i = 0; i <= 10; i++) {
      const name = Text.create(`user-${i}`, 'Pascalcase')

      const user = makeUser.execute({
        name,
        createdAt: new Date(2024, 0, i + i),
      })

      await usersRepository.create(user)
    }

    const response = await listUsers.execute({
      take: 100,
      order: 'desc',
      orderBy: 'createdAt',
    })

    response.value?.data.forEach((s, i) => {
      expect(s.name.value).toEqual(`User-${10 - i}`)
    })
  })
})
