import 'reflect-metadata'
import { beforeEach } from 'vitest'
import { MakeAllRepositories } from '@/core/factories/make-all-repositories'
import { container } from 'tsyringe'

beforeEach(() => {
  container.clearInstances()
  MakeAllRepositories.execute({
    globalStage: 'in memory',
    materials: {},
    products: {},
    users: {},
  })
})
