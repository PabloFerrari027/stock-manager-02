import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { LevelProps } from './level'
import { Entity } from '@/core/entities/entity'

export interface TypeLevelProps extends LevelProps {
  typeId: UniqueEntityID
  levelId: UniqueEntityID
}

export class TypeLevel extends Entity<TypeLevelProps> {
  get typeId() {
    return this.props.typeId
  }

  get levelId() {
    return this.props.levelId
  }

  static create(props: TypeLevelProps, id?: UniqueEntityID) {
    const typeLevel = new TypeLevel(props, id)
    return typeLevel
  }
}
