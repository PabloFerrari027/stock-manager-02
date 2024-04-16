import { Either, right } from '@/core/either'
import { Trims } from '../../../enterprise/entities/trims'
import { inject, injectable } from 'tsyringe'
import { TrimsRepository } from '../../repositories/trims-repository'
import { PaginationParams } from '@/core/types/pagination-params'
import { ListingResponse } from '@/core/types/listing-response'

interface ListTrimsRequest extends PaginationParams {}

type ListTrimsResponse = Either<null, ListingResponse<Trims>>

@injectable()
export class ListTrims {
  constructor(
    @inject('TrimsRepository')
    private trimsRepository: TrimsRepository,
  ) {}

  async execute(data: ListTrimsRequest): Promise<ListTrimsResponse> {
    const response = await this.trimsRepository.list(data)

    return right(response)
  }
}
