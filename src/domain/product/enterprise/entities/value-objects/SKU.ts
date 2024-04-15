export interface SKUProps {
  prefix: string
  department: string
  year: string
  sequential: number
  variation?: number
}

export class SKU {
  protected value: string

  protected constructor(value: string) {
    this.value = value
  }

  static create(props: SKUProps) {
    const prefix = props.prefix.substring(0, 2)

    const department = props.department.substring(0, 1)

    const year = props.year.substring(0, 2)

    const sequential = props.sequential

    const variation = props.variation

    let value = `${prefix}${department}${year}`

    if (sequential < 10) {
      value += `0${sequential}`
    } else {
      value += `${sequential}`
    }

    if (variation && variation < 10) {
      value += `.0${variation.toString().substring(0, 2)}`
    } else if (variation) {
      value += `.${variation.toString().substring(0, 2)}`
    }

    const sku = new SKU(value.toUpperCase())

    return sku
  }
}
