import { CollectionsRepository } from '@/domain/products/application/repositories/collections-repository'
import { MakeCollectionsRepository } from '@/domain/products/application/factories/make-collections-repository'
import { GridsRepository } from '@/domain/products/application/repositories/grids-repository'
import { MakeGridsRepository } from '@/domain/products/application/factories/make-grids-repository'
import { LinesRepository } from '@/domain/products/application/repositories/lines-repository'
import { MakeLinesRepository } from '@/domain/products/application/factories/make-lines-repository'
import { MakeCategoriesRepository } from '@/domain/products/application/factories/make-categories-repository'
import { CategoriesRepository } from '@/domain/products/application/repositories/categories-repository'
import { DepartmentsRepository } from '../repositories/departments-repository'
import { MakeDepartmentsRepository } from './make-departments-repository'
import { TypesRepository } from '../repositories/types-repository'
import { MakeTypesRepository } from './make-types-repository'
import { LevelsRepository } from '../repositories/levels-repository'
import { MakeLevelsRepository } from './make-levels-repository'

type Stage = 'in memory' | 'database'

interface MakeAllRepositoriesProps {
  globalStage: Stage
  collectionsRepository?: Stage
  gridsRepository?: Stage
  linesRepository?: Stage
  categoriesRepository?: Stage
  departmentsRepository?: Stage
  typesRepository?: Stage
  levelsRepository?: Stage
}

export class MakeAllRepositories {
  private _collectionsRepository: CollectionsRepository
  private _gridsRepository: GridsRepository
  private _linesRepository: LinesRepository
  private _categoriesRepository: CategoriesRepository
  private _departmentsRepository: DepartmentsRepository
  private _typesRepository: TypesRepository
  private _levelsRepository: LevelsRepository

  protected constructor(props: MakeAllRepositoriesProps) {
    const stage = props.globalStage

    this._collectionsRepository = MakeCollectionsRepository.execute({
      stage: props.collectionsRepository ?? stage,
    })

    this._gridsRepository = MakeGridsRepository.execute({
      stage: props.gridsRepository ?? stage,
    })

    this._linesRepository = MakeLinesRepository.execute({
      stage: props.linesRepository ?? stage,
    })

    this._categoriesRepository = MakeCategoriesRepository.execute({
      stage: props.categoriesRepository ?? stage,
    })

    this._departmentsRepository = MakeDepartmentsRepository.execute({
      stage: props.departmentsRepository ?? stage,
    })

    this._typesRepository = MakeTypesRepository.execute({
      stage: props.typesRepository ?? stage,
    })

    this._levelsRepository = MakeLevelsRepository.execute({
      stage: props.levelsRepository ?? stage,
    })
  }

  get CollectionsRepository() {
    return this._collectionsRepository
  }

  get GridsRepository() {
    return this._gridsRepository
  }

  get LinesRepository() {
    return this._linesRepository
  }

  get CategoriesRepository() {
    return this._categoriesRepository
  }

  get DepartmentsRepository() {
    return this._departmentsRepository
  }

  get TypesRepository() {
    return this._typesRepository
  }

  get LevelsRepository() {
    return this._levelsRepository
  }

  static execute(props: MakeAllRepositoriesProps) {
    const makeAllRepositories = new MakeAllRepositories(props)
    return makeAllRepositories
  }
}
