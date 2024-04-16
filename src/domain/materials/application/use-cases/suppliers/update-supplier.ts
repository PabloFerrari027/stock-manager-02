import { Either, left, right } from '@/core/either'
import { Supplier } from '../../../enterprise/entities/supplier'
import { inject, injectable } from 'tsyringe'
import { SuppliersRepository } from '../../repositories/supplier-repository'
import { NotFoundError } from '@/core/errors/not-found-error'
import { Text } from '@/core/entities/text'

interface UpdateSupplierRequest {
  id: string
  name: string
}

type UpdateSupplierResponse = Either<
  NotFoundError,
  {
    supplier: Supplier
  }
>

@injectable()
export class UpdateSupplier {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: SuppliersRepository,
  ) {}

  async execute(data: UpdateSupplierRequest): Promise<UpdateSupplierResponse> {
    const supplier = await this.suppliersRepository.findById(data.id)

    if (!supplier) {
      return left(new NotFoundError())
    }

    supplier.name = Text.create(data.name, 'Pascalcase')

    await this.suppliersRepository.save(supplier)

    return right({
      supplier,
    })
  }
}
