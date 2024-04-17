import { Either, left, right } from '@/core/either'
import { Department } from '../../../enterprise/entities/department'
import { inject, injectable } from 'tsyringe'
import { NotFoundError } from '@/core/errors/not-found-error'
import { Text } from '@/core/entities/text'
import { DepartmentsRepository } from '../../repositories/departments-repository'
import { AlreadyExistsError } from '@/core/errors/already-exists-error'

interface UpdateDepartmentRequest {
  id: string
  name?: string
}

type UpdateDepartmentResponse = Either<
  NotFoundError | AlreadyExistsError,
  {
    department: Department
  }
>

@injectable()
export class UpdateDepartment {
  constructor(
    @inject('UsersDepartmentsRepository')
    private departmentsRepository: DepartmentsRepository,
  ) {}

  async execute(
    data: UpdateDepartmentRequest,
  ): Promise<UpdateDepartmentResponse> {
    const department = await this.departmentsRepository.findById(data.id)

    if (!department) {
      return left(new NotFoundError())
    }

    if (data.name) {
      const name = Text.create(data.name, 'Pascalcase')

      const getByName = await this.departmentsRepository.findByName(name.value)

      if (getByName) {
        const message = `Name ${name} already exists!`

        return left(new AlreadyExistsError(message))
      }

      department.name = name
    }

    await this.departmentsRepository.save(department)

    return right({
      department,
    })
  }
}
