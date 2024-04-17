import { Either, left, right } from '@/core/either'
import { Department } from '../../../enterprise/entities/department'
import { Text } from '@/core/entities/text'
import { inject, injectable } from 'tsyringe'
import { NotFoundError } from '@/core/errors/not-found-error'
import { DepartmentsRepository } from '../../repositories/departments-repository'
import { AlreadyExistsError } from '@/core/errors/already-exists-error'

interface CreateDepartmentRequest {
  name: string
}

type CreateDepartmentResponse = Either<
  NotFoundError,
  {
    department: Department
  }
>

@injectable()
export class CreateDepartment {
  constructor(
    @inject('ProductsDepartmentsRepository')
    private departmentsRepository: DepartmentsRepository,
  ) {}

  async execute(
    data: CreateDepartmentRequest,
  ): Promise<CreateDepartmentResponse> {
    const name = Text.create(data.name, 'Pascalcase')

    const getByName = await this.departmentsRepository.findByName(name.value)

    if (getByName) {
      const message = `Name ${name} already exists!`

      return left(new AlreadyExistsError(message))
    }

    const department = Department.create({
      name,
      isActive: true,
    })

    await this.departmentsRepository.create(department)

    return right({
      department,
    })
  }
}
