import { Either, right } from '@/core/either'
import { Supplier } from '../../../enterprise/entities/supplier'
import { inject, injectable } from 'tsyringe'
import { SuppliersRepository } from '../../repositories/supplier-repository'

interface FindSupplierRequest {
  id: string
}

type FindSupplierResponse = Either<
  null,
  {
    supplier: Supplier | null
  }
>

@injectable()
export class FindSupplier {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: SuppliersRepository,
  ) {}

  async execute(data: FindSupplierRequest): Promise<FindSupplierResponse> {
    const supplier = await this.suppliersRepository.findById(data.id)

    return right({
      supplier,
    })
  }
}
