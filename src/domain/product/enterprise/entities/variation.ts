import { Entity } from '@/core/entities/entity'
import { VariationSKU } from './value-objects/variation-SKU'

export interface VariationProps {
  name: string
  variationSKU: VariationSKU
  createdAt: Date
  updatedAt: Date
}

export class Variation extends Entity<VariationProps> {
  get name(): string {
    return this.props.name
  }

  get variationSKU(): VariationSKU {
    return this.props.variationSKU
  }

  set name(name: string) {
    this.props.name = name
  }
}
