import { Either, right } from '@/core/either'
import { Line } from '../../../enterprise/entities/line'
import { inject, injectable } from 'tsyringe'
import { LinesRepository } from '../../repositories/lines-repository'

interface FindLineRequest {
  id: string
}

type FindLineResponse = Either<
  null,
  {
    line: Line | null
  }
>

@injectable()
export class FindLine {
  constructor(
    @inject('LinesRepository')
    private linesRepository: LinesRepository,
  ) {}

  async execute(data: FindLineRequest): Promise<FindLineResponse> {
    const line = await this.linesRepository.findById(data.id)

    return right({
      line,
    })
  }
}
