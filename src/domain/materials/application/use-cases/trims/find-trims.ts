import { Either, right } from '@/core/either'
import { Trims } from '../../../enterprise/entities/trims'
import { inject, injectable } from 'tsyringe'
import { TrimsRepository } from '../../repositories/trims-repository'

interface FindTrimsRequest {
  id: string
}

type FindTrimsResponse = Either<
  null,
  {
    trims: Trims | null
  }
>

@injectable()
export class FindTrims {
  constructor(
    @inject('TrimsRepository')
    private trimsRepository: TrimsRepository,
  ) {}

  async execute(data: FindTrimsRequest): Promise<FindTrimsResponse> {
    const trims = await this.trimsRepository.findById(data.id)

    return right({
      trims,
    })
  }
}
