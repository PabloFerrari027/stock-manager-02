import { MakeAllRepositories as MakeAllMaterialsRepositories } from '@domain/materials/application/factories/make-all-repositories'
import { MakeAllRepositories as MakeAllUsersRepositories } from '@domain/users/application/factories/make-all-repositories'
import { MakeAllRepositories as MakeAllProductsRepositories } from '@domain/products/application/factories/make-all-repositories'

type Stage = 'in memory' | 'database'

interface MakeAllRepositoriesProps {
  globalStage: Stage
  users: {
    globalStage?: Stage
    usersRepository?: Stage
    rolesRepository?: Stage
    departmentsRepository?: Stage
  }
  products: {
    globalStage?: Stage
    collectionsRepository?: Stage
    gridsRepository?: Stage
    linesRepository?: Stage
    categoriesRepository?: Stage
    typesRepository?: Stage
    levelsRepository?: Stage
  }
  materials: {
    globalStage?: Stage
    suppliersRepository?: Stage
    trimsRepository?: Stage
    feedStocksRepository?: Stage
  }
}

export class MakeAllRepositories {
  private static _materials: MakeAllMaterialsRepositories
  private static _users: MakeAllUsersRepositories
  private static _products: MakeAllProductsRepositories

  static get products(): MakeAllProductsRepositories {
    return this._products
  }

  static get users(): MakeAllUsersRepositories {
    return this._users
  }

  static get materials(): MakeAllMaterialsRepositories {
    return this._materials
  }

  static execute(props: MakeAllRepositoriesProps) {
    const globalStage = props.globalStage

    this._products = MakeAllProductsRepositories.execute({
      ...props.products,
      globalStage: props.products.globalStage ?? globalStage,
    })

    this._users = MakeAllUsersRepositories.execute({
      ...props.users,
      globalStage: props.users.globalStage ?? globalStage,
    })

    this._materials = MakeAllMaterialsRepositories.execute({
      ...props.materials,
      globalStage: props.materials.globalStage ?? globalStage,
    })
  }
}
