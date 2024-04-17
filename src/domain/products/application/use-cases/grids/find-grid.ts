import { Either, right } from '@/core/either'
import { Grid } from '../../../enterprise/entities/grid'
import { inject, injectable } from 'tsyringe'
import { GridsRepository } from '../../repositories/grids-repository'

interface FindGridRequest {
  id: string
}

type FindGridResponse = Either<
  null,
  {
    grid: Grid | null
  }
>

@injectable()
export class FindGrid {
  constructor(
    @inject('GridsRepository')
    private gridsRepository: GridsRepository,
  ) {}

  async execute(data: FindGridRequest): Promise<FindGridResponse> {
    const grid = await this.gridsRepository.findById(data.id)

    return right({
      grid,
    })
  }
}
