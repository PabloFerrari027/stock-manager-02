import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface SKUProps {
  departmentId: UniqueEntityID
  lineId: UniqueEntityID
  categoryId: UniqueEntityID
  prefix: string
  sequential: number
  variation?: number | null
  size?: string | null
  createdAt: Date
}

export class SKU extends Entity<SKUProps> {
  protected _value: string

  protected constructor(value: string, props: SKUProps) {
    super(props)
    this._value = value
  }

  get value() {
    return this._value
  }

  get prefix(): string {
    const prefix = this.props.prefix
    return prefix
  }

  get sequential(): number {
    const sequential = this.props.sequential

    return sequential
  }

  get variation() {
    const variation = this.props.variation

    return variation
  }

  get size() {
    const size = this.props.size
    return size
  }

  get categoryId() {
    return this.props.categoryId
  }

  get departmentId() {
    return this.props.departmentId
  }

  get lineId() {
    return this.props.lineId
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(props: Optional<SKUProps, 'createdAt'>) {
    const prefix = props.prefix.substring(0, 2)

    const sequential = props.sequential

    const variation = props.variation

    let value = prefix

    if (sequential < 10) {
      value += `00${sequential}`
    } else if (sequential < 100) {
      value += `0${sequential}`
    } else {
      value += `${sequential}`
    }

    if (variation && variation < 10) {
      value += `.0${variation.toString().substring(0, 2)}`
    } else if (variation) {
      value += `.${variation.toString().substring(0, 2)}`
    }

    const size = props.size

    if (size) {
      value += `-${props.size}`
    }

    const sku = new SKU(value.toUpperCase(), {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    })

    return sku
  }

  static prefixIsValid(value: string): boolean {
    if (value.length !== 2) return false

    const prefixHasNumber = /\d/.test(value)

    if (prefixHasNumber) return false
    else return true
  }

  static sequentialIsValid(value: string): boolean {
    const sequentialHasNonNumeric = /\D/.test(value)

    if (sequentialHasNonNumeric) return false
    else return true
  }

  static variationIsValid(value: string): boolean {
    const variationHasNonNumeric = /\D/.test(value)

    if (variationHasNonNumeric) return false
    else return false
  }

  static isValid(value: string): boolean {
    const prefix = value.substring(0, 2)

    const prefixIsValid = this.prefixIsValid(prefix)

    if (!prefixIsValid) return false

    const chunks = value.split('.')

    const sequential = value.substring(5, chunks[0].length)

    const sequentialIsValid = this.sequentialIsValid(sequential)

    if (!sequentialIsValid) return false

    const isVariation = chunks[1]

    if (!isVariation) return true

    const variationIsValid = this.variationIsValid(chunks[1])

    if (!variationIsValid) return false

    return true
  }
}
