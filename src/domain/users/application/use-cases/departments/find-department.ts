import { Either, right } from '@/core/either'
import { Department } from '../../../enterprise/entities/department'
import { inject, injectable } from 'tsyringe'
import { DepartmentsRepository } from '../../repositories/departments-repository'

interface FindDepartmentRequest {
  id: string
}

type FindDepartmentResponse = Either<
  null,
  {
    department: Department | null
  }
>

@injectable()
export class FindDepartment {
  constructor(
    @inject('UsersDepartmentsRepository')
    private departmentsRepository: DepartmentsRepository,
  ) {}

  async execute(data: FindDepartmentRequest): Promise<FindDepartmentResponse> {
    const department = await this.departmentsRepository.findById(data.id)

    return right({
      department,
    })
  }
}
