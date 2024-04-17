import { Entity } from '@/core/entities/entity'
import { TypeProps } from './type'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface CategoryTypeProps extends TypeProps {
  categoryId: UniqueEntityID
  typeId: UniqueEntityID
}

export class CategoryType extends Entity<CategoryTypeProps> {
  get categoryId() {
    return this.props.categoryId
  }

  get typeId() {
    return this.props.typeId
  }

  static create(props: CategoryTypeProps, id?: UniqueEntityID) {
    const categoryType = new CategoryType(props, id)
    return categoryType
  }
}
