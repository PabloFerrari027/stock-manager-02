import { Either, left, right } from '@/core/either'
import { Grid } from '../../../enterprise/entities/grid'
import { inject, injectable } from 'tsyringe'
import { NotFoundError } from '@/core/errors/not-found-error'
import { Text } from '@/core/entities/text'
import { GridsRepository } from '../../repositories/grids-repository'
import { AlreadyExistsError } from '@/core/errors/already-exists-error'

interface UpdateGridRequest {
  id: string
  name?: string
}

type UpdateGridResponse = Either<
  NotFoundError | AlreadyExistsError,
  {
    grid: Grid
  }
>

@injectable()
export class UpdateGrid {
  constructor(
    @inject('GridsRepository')
    private gridsRepository: GridsRepository,
  ) {}

  async execute(data: UpdateGridRequest): Promise<UpdateGridResponse> {
    const grid = await this.gridsRepository.findById(data.id)

    if (!grid) {
      return left(new NotFoundError())
    }

    if (data.name) {
      const name = Text.create(data.name, 'Pascalcase')

      const getByName = await this.gridsRepository.findByName(name.value)

      if (getByName) {
        const message = `Name ${name} already exists!`

        return left(new AlreadyExistsError(message))
      }

      grid.name = name
    }

    await this.gridsRepository.save(grid)

    return right({
      grid,
    })
  }
}
