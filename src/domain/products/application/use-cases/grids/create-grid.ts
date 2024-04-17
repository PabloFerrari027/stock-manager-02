import { Either, left, right } from '@/core/either'
import { Grid } from '../../../enterprise/entities/grid'
import { Text } from '@/core/entities/text'
import { inject, injectable } from 'tsyringe'
import { NotFoundError } from '@/core/errors/not-found-error'
import { GridsRepository } from '../../repositories/grids-repository'
import { AlreadyExistsError } from '@/core/errors/already-exists-error'

interface CreateGridRequest {
  name: string
}

type CreateGridResponse = Either<
  NotFoundError,
  {
    grid: Grid
  }
>

@injectable()
export class CreateGrid {
  constructor(
    @inject('GridsRepository')
    private gridsRepository: GridsRepository,
  ) {}

  async execute(data: CreateGridRequest): Promise<CreateGridResponse> {
    const name = Text.create(data.name, 'Pascalcase')

    const getByName = await this.gridsRepository.findByName(name.value)

    if (getByName) {
      const message = `Name ${name} already exists!`

      return left(new AlreadyExistsError(message))
    }

    const grid = Grid.create({
      name,
      isActive: true,
    })

    await this.gridsRepository.create(grid)

    return right({
      grid,
    })
  }
}
