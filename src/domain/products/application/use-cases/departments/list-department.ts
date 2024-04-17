import { Either, right } from '@/core/either'
import { Department } from '../../../enterprise/entities/department'
import { inject, injectable } from 'tsyringe'
import { DepartmentsRepository } from '../../repositories/departments-repository'
import { PaginationParams } from '@/core/types/pagination-params'
import { ListingResponse } from '@/core/types/listing-response'

interface ListDepartmentsRequest extends PaginationParams {}

type ListDepartmentsResponse = Either<null, ListingResponse<Department>>

@injectable()
export class ListDepartments {
  constructor(
    @inject('ProductsDepartmentsRepository')
    private departmentsRepository: DepartmentsRepository,
  ) {}

  async execute(
    data: ListDepartmentsRequest,
  ): Promise<ListDepartmentsResponse> {
    const response = await this.departmentsRepository.list(data)

    return right(response)
  }
}
