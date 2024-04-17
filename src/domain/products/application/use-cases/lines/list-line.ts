import { Either, right } from '@/core/either'
import { Line } from '../../../enterprise/entities/line'
import { inject, injectable } from 'tsyringe'
import { LinesRepository } from '../../repositories/lines-repository'
import { PaginationParams } from '@/core/types/pagination-params'
import { ListingResponse } from '@/core/types/listing-response'

interface ListLinesRequest extends PaginationParams {}

type ListLinesResponse = Either<null, ListingResponse<Line>>

@injectable()
export class ListLines {
  constructor(
    @inject('LinesRepository')
    private linesRepository: LinesRepository,
  ) {}

  async execute(data: ListLinesRequest): Promise<ListLinesResponse> {
    const response = await this.linesRepository.list(data)

    return right(response)
  }
}
