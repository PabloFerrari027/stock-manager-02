import { Either, left, right } from '@/core/either'
import { Trims } from '../../../enterprise/entities/trims'
import { inject, injectable } from 'tsyringe'
import { TrimsRepository } from '../../repositories/trims-repository'
import { NotFoundError } from '@/core/errors/not-found-error'
import { Text } from '@/core/entities/text'

interface UpdateTrimsRequest {
  id: string
  name: string
}

type UpdateTrimsResponse = Either<
  NotFoundError,
  {
    trims: Trims
  }
>

@injectable()
export class UpdateTrims {
  constructor(
    @inject('TrimsRepository')
    private trimsRepository: TrimsRepository,
  ) {}

  async execute(data: UpdateTrimsRequest): Promise<UpdateTrimsResponse> {
    const trims = await this.trimsRepository.findById(data.id)

    if (!trims) {
      return left(new NotFoundError())
    }

    trims.name = Text.create(data.name, 'Pascalcase')

    await this.trimsRepository.save(trims)

    return right({
      trims,
    })
  }
}
