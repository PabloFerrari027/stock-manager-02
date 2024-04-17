import { Either, right } from '@/core/either'
import { Grid } from '../../../enterprise/entities/grid'
import { inject, injectable } from 'tsyringe'
import { GridsRepository } from '../../repositories/grids-repository'
import { PaginationParams } from '@/core/types/pagination-params'
import { ListingResponse } from '@/core/types/listing-response'

interface ListGridsRequest extends PaginationParams {}

type ListGridsResponse = Either<null, ListingResponse<Grid>>

@injectable()
export class ListGrids {
  constructor(
    @inject('GridsRepository')
    private gridsRepository: GridsRepository,
  ) {}

  async execute(data: ListGridsRequest): Promise<ListGridsResponse> {
    const response = await this.gridsRepository.list(data)

    return right(response)
  }
}
