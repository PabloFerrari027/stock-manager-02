import { Either, right } from '@/core/either'
import { Supplier } from '../../../enterprise/entities/supplier'
import { Text } from '@/core/entities/text'
import { inject, injectable } from 'tsyringe'
import { SuppliersRepository } from '../../repositories/supplier-repository'

interface CreateSupplierRequest {
  name: string
}

type CreateSupplierResponse = Either<
  null,
  {
    supplier: Supplier
  }
>

@injectable()
export class CreateSupplier {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: SuppliersRepository,
  ) {}

  async execute(data: CreateSupplierRequest): Promise<CreateSupplierResponse> {
    const name = Text.create(data.name, 'Pascalcase')

    const supplier = Supplier.create({
      name,
    })

    await this.suppliersRepository.create(supplier)

    return right({
      supplier,
    })
  }
}
