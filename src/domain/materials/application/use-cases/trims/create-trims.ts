import { Either, left, right } from '@/core/either'
import { Trims } from '../../../enterprise/entities/trims'
import { Text } from '@/core/entities/text'
import { inject, injectable } from 'tsyringe'
import { TrimsRepository } from '../../repositories/trims-repository'
import { SuppliersRepository } from '../../repositories/suppliers-repository'
import { NotFoundError } from '@/core/errors/not-found-error'

interface CreateTrimsRequest {
  name: string
  supplierId: string
  unit: string
}

type CreateTrimsResponse = Either<
  NotFoundError,
  {
    trims: Trims
  }
>

@injectable()
export class CreateTrims {
  constructor(
    @inject('TrimsRepository')
    private trimsRepository: TrimsRepository,
    @inject('SuppliersRepository')
    private suppliersRepository: SuppliersRepository,
  ) {}

  async execute(data: CreateTrimsRequest): Promise<CreateTrimsResponse> {
    const name = Text.create(data.name, 'Pascalcase')

    const supplier = await this.suppliersRepository.findById(data.supplierId)

    if (!supplier) {
      return left(new NotFoundError())
    }

    const unit = Text.create(data.unit, 'Uppercase')

    const trims = Trims.create({
      name,
      supplierId: supplier.id,
      unit,
    })

    await this.trimsRepository.create(trims)

    return right({
      trims,
    })
  }
}
