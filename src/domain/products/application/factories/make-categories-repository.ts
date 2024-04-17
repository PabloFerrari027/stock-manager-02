import { container, injectable } from 'tsyringe'
import { CategoriesRepository } from '../repositories/categories-repository'
import { NotImplementedError } from '@/core/errors/not-implemented-error'
import { InMemoryCategoriesRepository } from 'test/repositories/products/in-memory-categories-repository'

interface MakeCategoriesRepositoryProps {
  stage: 'in memory' | 'database'
}

@injectable()
export class MakeCategoriesRepository {
  static execute(props: MakeCategoriesRepositoryProps): CategoriesRepository {
    switch (props.stage) {
      case 'in memory': {
        const repository = container.resolve(InMemoryCategoriesRepository)

        container.registerInstance('CategoriesRepository', repository)

        return repository
      }

      case 'database': {
        container.register('CategoriesRepository', InMemoryCategoriesRepository)

        const repository = container.resolve(InMemoryCategoriesRepository)

        return repository
      }

      default: {
        throw new NotImplementedError()
      }
    }
  }
}
