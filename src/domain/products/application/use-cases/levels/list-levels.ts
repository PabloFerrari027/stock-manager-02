import { Either, right } from '@/core/either'
import { Level } from '../../../enterprise/entities/level'
import { inject, injectable } from 'tsyringe'
import { LevelsRepository } from '../../repositories/levels-repository'
import { PaginationParams } from '@/core/types/pagination-params'
import { ListingResponse } from '@/core/types/listing-response'

interface ListLevelsRequest extends PaginationParams {}

type ListLevelsResponse = Either<null, ListingResponse<Level>>

@injectable()
export class ListLevels {
  constructor(
    @inject('LevelsRepository')
    private levelsRepository: LevelsRepository,
  ) {}

  async execute(data: ListLevelsRequest): Promise<ListLevelsResponse> {
    const response = await this.levelsRepository.list(data)

    return right(response)
  }
}
