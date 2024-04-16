import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Material, MaterialProps } from './material'
import { Optional } from '@/core/types/optional'

export interface TrimsProps extends MaterialProps {}

export class Trims extends Material {
  static create(props: Optional<TrimsProps, 'createdAt'>, id?: UniqueEntityID) {
    const trim = new Trims(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    )
    return trim
  }
}
