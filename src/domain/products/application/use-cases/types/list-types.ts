import { Either, right } from '@/core/either'
import { Type } from '../../../enterprise/entities/type'
import { inject, injectable } from 'tsyringe'
import { TypesRepository } from '../../repositories/types-repository'
import { PaginationParams } from '@/core/types/pagination-params'
import { ListingResponse } from '@/core/types/listing-response'

interface ListTypesRequest extends PaginationParams {}

type ListTypesResponse = Either<null, ListingResponse<Type>>

@injectable()
export class ListTypes {
  constructor(
    @inject('TypesRepository')
    private typesRepository: TypesRepository,
  ) {}

  async execute(data: ListTypesRequest): Promise<ListTypesResponse> {
    const response = await this.typesRepository.list(data)

    return right(response)
  }
}
