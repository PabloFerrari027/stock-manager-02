import { Text } from '@/core/entities/text'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Trims } from '@/domain/materials/enterprise/entities/trims'
import { faker } from '@faker-js/faker'

interface MakeTrimsProps {
  name?: Text
  supplierId?: UniqueEntityID
  unit?: Text
  createdAt?: Date
  updatedAt?: Date
}

export class makeTrims {
  static execute(props: MakeTrimsProps, id?: UniqueEntityID) {
    const name = props.name ?? Text.create(faker.company.name(), 'Pascalcase')

    const supplierId = props.supplierId ?? new UniqueEntityID()

    const unit =
      props.unit ?? Text.create(faker.science.unit().symbol, 'Uppercase')

    const updatedAt = props.updatedAt

    const createdAt = props.createdAt

    const trims = Trims.create(
      {
        name,
        supplierId,
        unit,
        updatedAt,
        createdAt,
      },
      id,
    )

    return trims
  }
}
