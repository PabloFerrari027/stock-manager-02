import { MakeFeedStockRepository } from '@/domain/materials/application/factories/make-feed-stock-repository'
import { MakeSuppliersRepository } from '@/domain/materials/application/factories/make-suppliers-repository'
import { MakeTrimsRepository } from '@/domain/materials/application/factories/make-trims-repository'
import { FeedStockRepository } from '@/domain/materials/application/repositories/feed-stock-repository'
import { SuppliersRepository } from '@/domain/materials/application/repositories/supplier-repository'
import { TrimsRepository } from '@/domain/materials/application/repositories/trims-repository'
import { MakeUsersRepository } from '@/domain/users/application/factories/make-users-repository'
import { MakeDepartmentsRepository } from '@/domain/users/application/factories/make-departments-repository'
import { MakeRolesRepository } from '@/domain/users/application/factories/make-roles-repository'
import { UsersRepository } from '@/domain/users/application/repositories/users-repository'
import { DepartmentsRepository } from '@/domain/users/application/repositories/departments-repository'
import { RolesRepository } from '@/domain/users/application/repositories/roles-repository'

type Stage = 'in memory' | 'database'

interface MakeAllRepositoriesProps {
  globalStage: Stage
  suppliersRepository?: Stage
  trimsRepository?: Stage
  feedStockRepository?: Stage
  usersRepository?: Stage
  rolesRepository?: Stage
  departmentsRepository?: Stage
}

export class MakeAllRepositories {
  private static _suppliersRepository: SuppliersRepository
  private static _trimsRepository: TrimsRepository
  private static _feedStockRepository: FeedStockRepository
  private static _usersRepository: UsersRepository
  private static _rolesRepository: RolesRepository
  private static _departmentsRepository: DepartmentsRepository

  static get SuppliersRepository() {
    return this._suppliersRepository
  }

  static get TrimsRepository() {
    return this._trimsRepository
  }

  static get FeedStockRepository() {
    return this._feedStockRepository
  }

  static get UsersRepository() {
    return this._usersRepository
  }

  static get RolesRepository() {
    return this._rolesRepository
  }

  static get DepartmentsRepository() {
    return this._departmentsRepository
  }

  static execute(props: MakeAllRepositoriesProps) {
    const stage = props.globalStage

    this._suppliersRepository = MakeSuppliersRepository.execute({
      stage: props.suppliersRepository ?? stage,
    })

    this._trimsRepository = MakeTrimsRepository.execute({
      stage: props.trimsRepository ?? stage,
    })

    this._feedStockRepository = MakeFeedStockRepository.execute({
      stage: props.feedStockRepository ?? stage,
    })

    this._usersRepository = MakeUsersRepository.execute({
      stage: props.usersRepository ?? stage,
    })

    this._rolesRepository = MakeRolesRepository.execute({
      stage: props.rolesRepository ?? stage,
    })

    this._departmentsRepository = MakeDepartmentsRepository.execute({
      stage: props.departmentsRepository ?? stage,
    })
  }
}
