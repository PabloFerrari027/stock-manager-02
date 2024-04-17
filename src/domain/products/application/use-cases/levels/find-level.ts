import { Either, right } from '@/core/either'
import { Level } from '../../../enterprise/entities/level'
import { inject, injectable } from 'tsyringe'
import { LevelsRepository } from '../../repositories/levels-repository'

interface FindLevelRequest {
  id: string
}

type FindLevelResponse = Either<
  null,
  {
    level: Level | null
  }
>

@injectable()
export class FindLevel {
  constructor(
    @inject('LevelsRepository')
    private levelsRepository: LevelsRepository,
  ) {}

  async execute(data: FindLevelRequest): Promise<FindLevelResponse> {
    const level = await this.levelsRepository.findById(data.id)

    return right({
      level,
    })
  }
}
