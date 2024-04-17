import { MakeFeedStocksRepository } from '@/domain/materials/application/factories/make-feed-stocks-repository'
import { MakeSuppliersRepository } from '@/domain/materials/application/factories/make-suppliers-repository'
import { MakeTrimsRepository } from '@/domain/materials/application/factories/make-trims-repository'
import { FeedStocksRepository } from '@/domain/materials/application/repositories/feed-stocks-repository'
import { SuppliersRepository } from '@/domain/materials/application/repositories/suppliers-repository'
import { TrimsRepository } from '@/domain/materials/application/repositories/trims-repository'

type Stage = 'in memory' | 'database'

interface MakeAllRepositoriesProps {
  globalStage: Stage
  suppliersRepository?: Stage
  trimsRepository?: Stage
  feedStocksRepository?: Stage
}

export class MakeAllRepositories {
  private _suppliersRepository: SuppliersRepository
  private _trimsRepository: TrimsRepository
  private _feedStocksRepository: FeedStocksRepository

  protected constructor(props: MakeAllRepositoriesProps) {
    const stage = props.globalStage

    this._suppliersRepository = MakeSuppliersRepository.execute({
      stage: props.suppliersRepository ?? stage,
    })

    this._trimsRepository = MakeTrimsRepository.execute({
      stage: props.trimsRepository ?? stage,
    })

    this._feedStocksRepository = MakeFeedStocksRepository.execute({
      stage: props.feedStocksRepository ?? stage,
    })
  }

  get SuppliersRepository() {
    return this._suppliersRepository
  }

  get TrimsRepository() {
    return this._trimsRepository
  }

  get FeedStocksRepository() {
    return this._feedStocksRepository
  }

  static execute(props: MakeAllRepositoriesProps) {
    const makeAllRepositories = new MakeAllRepositories(props)
    return makeAllRepositories
  }
}
