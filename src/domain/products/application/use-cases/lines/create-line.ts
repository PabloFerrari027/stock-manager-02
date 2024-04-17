import { Either, left, right } from '@/core/either'
import { Line } from '../../../enterprise/entities/line'
import { Text } from '@/core/entities/text'
import { inject, injectable } from 'tsyringe'
import { NotFoundError } from '@/core/errors/not-found-error'
import { LinesRepository } from '../../repositories/lines-repository'
import { AlreadyExistsError } from '@/core/errors/already-exists-error'

interface CreateLineRequest {
  name: string
}

type CreateLineResponse = Either<
  NotFoundError,
  {
    line: Line
  }
>

@injectable()
export class CreateLine {
  constructor(
    @inject('LinesRepository')
    private linesRepository: LinesRepository,
  ) {}

  async execute(data: CreateLineRequest): Promise<CreateLineResponse> {
    const name = Text.create(data.name, 'Pascalcase')

    const getByName = await this.linesRepository.findByName(name.value)

    if (getByName) {
      const message = `Name ${name} already exists!`

      return left(new AlreadyExistsError(message))
    }

    const line = Line.create({
      name,
      isActive: true,
    })

    await this.linesRepository.create(line)

    return right({
      line,
    })
  }
}
