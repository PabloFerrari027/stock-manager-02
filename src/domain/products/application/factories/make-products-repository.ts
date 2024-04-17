import { container, injectable } from 'tsyringe'
import { ProductsRepository } from '../repositories/products-repository'
import { NotImplementedError } from '@/core/errors/not-implemented-error'
import { InMemoryProductsRepository } from 'test/repositories/products/in-memory-products-repository'

interface MakeProductsRepositoryProps {
  stage: 'in memory' | 'database'
}

@injectable()
export class MakeProductsRepository {
  static execute(props: MakeProductsRepositoryProps): ProductsRepository {
    switch (props.stage) {
      case 'in memory': {
        const repository = container.resolve(InMemoryProductsRepository)

        container.registerInstance('ProductsRepository', repository)

        return repository
      }

      case 'database': {
        container.register('ProductsRepository', InMemoryProductsRepository)

        const repository = container.resolve(InMemoryProductsRepository)

        return repository
      }

      default: {
        throw new NotImplementedError()
      }
    }
  }
}
