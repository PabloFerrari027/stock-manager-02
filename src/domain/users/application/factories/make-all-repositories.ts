import { MakeUsersRepository } from '@/domain/users/application/factories/make-users-repository'
import { MakeRolesRepository } from '@/domain/users/application/factories/make-roles-repository'
import { UsersRepository } from '@/domain/users/application/repositories/users-repository'
import { DepartmentsRepository } from '@/domain/users/application/repositories/departments-repository'
import { RolesRepository } from '@/domain/users/application/repositories/roles-repository'
import { MakeDepartmentsRepository } from './make-departments-repository'

type Stage = 'in memory' | 'database'

interface MakeAllRepositoriesProps {
  globalStage: Stage
  usersRepository?: Stage
  rolesRepository?: Stage
  departmentsRepository?: Stage
}

export class MakeAllRepositories {
  private _usersRepository: UsersRepository
  private _rolesRepository: RolesRepository
  private _departmentsRepository: DepartmentsRepository

  protected constructor(props: MakeAllRepositoriesProps) {
    const stage = props.globalStage

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

  get UsersRepository() {
    return this._usersRepository
  }

  get RolesRepository() {
    return this._rolesRepository
  }

  get DepartmentsRepository() {
    return this._departmentsRepository
  }

  static execute(props: MakeAllRepositoriesProps) {
    const makeAllRepositories = new MakeAllRepositories(props)
    return makeAllRepositories
  }
}
