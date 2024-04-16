import { Text } from '@/core/entities/text'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Supplier } from '@/domain/materials/enterprise/entities/supplier'
import { faker } from '@faker-js/faker'

interface MakeSupplierProps {
  name?: Text
  createdAt?: Date
}

export class makeSupplier {
  static execute(props: MakeSupplierProps, id?: UniqueEntityID) {
    const name = props.name ?? Text.create(faker.company.name(), 'Pascalcase')

    const createdAt = props.createdAt

    const supplier = Supplier.create(
      {
        name,
        createdAt,
      },
      id,
    )

    return supplier
  }
}
