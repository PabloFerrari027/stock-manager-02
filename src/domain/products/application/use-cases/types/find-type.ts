import { Either, right } from '@/core/either'
import { Type } from '../../../enterprise/entities/type'
import { inject, injectable } from 'tsyringe'
import { TypesRepository } from '../../repositories/types-repository'

interface FindTypeRequest {
  id: string
}

type FindTypeResponse = Either<
  null,
  {
    type: Type | null
  }
>

@injectable()
export class FindType {
  constructor(
    @inject('TypesRepository')
    private typesRepository: TypesRepository,
  ) {}

  async execute(data: FindTypeRequest): Promise<FindTypeResponse> {
    const type = await this.typesRepository.findById(data.id)

    return right({
      type,
    })
  }
}
