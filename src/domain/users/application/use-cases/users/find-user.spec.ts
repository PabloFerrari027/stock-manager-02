import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { describe, it, beforeEach } from 'vitest'
import { FindUser } from './find-user'
import { container } from 'tsyringe'
import { makeUser } from 'test/factories/make-user'
import { UsersRepository } from '../../repositories/users-repository'

let findUser: FindUser
let usersRepository: UsersRepository

describe('Find User', () => {
  beforeEach(() => {
    usersRepository = MakeAllRepositories.UsersRepository
    findUser = container.resolve(FindUser)
  })

  it('Should to be able to find a user', async () => {
    const user = makeUser.execute({})

    await usersRepository.create(user)

    const response = await findUser.execute({
      id: user.id.toString(),
    })

    expect(response.isRight()).toBeTruthy()
    expect(user).toEqual(response.value?.user)
  })

  it('Should to be able to throw error if the user is not found', async () => {
    const response = await findUser.execute({
      id: 'user-1',
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value?.user).not.toBeTruthy()
  })
})
