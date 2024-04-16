import { Either, right } from '@/core/either'
import { Supplier } from '../../../enterprise/entities/supplier'
import { inject, injectable } from 'tsyringe'
import { SuppliersRepository } from '../../repositories/supplier-repository'
import { PaginationParams } from '@/core/types/pagination-params'
import { ListingResponse } from '@/core/types/listing-response'

interface ListSuppliersRequest extends PaginationParams {}

type ListSuppliersResponse = Either<null, ListingResponse<Supplier>>

@injectable()
export class ListSuppliers {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: SuppliersRepository,
  ) {}

  async execute(data: ListSuppliersRequest): Promise<ListSuppliersResponse> {
    const response = await this.suppliersRepository.list(data)

    return right(response)
  }
}
