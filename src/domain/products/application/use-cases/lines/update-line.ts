import { Either, left, right } from '@/core/either'
import { Line } from '../../../enterprise/entities/line'
import { inject, injectable } from 'tsyringe'
import { NotFoundError } from '@/core/errors/not-found-error'
import { Text } from '@/core/entities/text'
import { LinesRepository } from '../../repositories/lines-repository'
import { AlreadyExistsError } from '@/core/errors/already-exists-error'

interface UpdateLineRequest {
  id: string
  name?: string
}

type UpdateLineResponse = Either<
  NotFoundError | AlreadyExistsError,
  {
    line: Line
  }
>

@injectable()
export class UpdateLine {
  constructor(
    @inject('LinesRepository')
    private linesRepository: LinesRepository,
  ) {}

  async execute(data: UpdateLineRequest): Promise<UpdateLineResponse> {
    const line = await this.linesRepository.findById(data.id)

    if (!line) {
      return left(new NotFoundError())
    }

    if (data.name) {
      const name = Text.create(data.name, 'Pascalcase')

      const getByName = await this.linesRepository.findByName(name.value)

      if (getByName) {
        const message = `Name ${name} already exists!`

        return left(new AlreadyExistsError(message))
      }

      line.name = name
    }

    await this.linesRepository.save(line)

    return right({
      line,
    })
  }
}
