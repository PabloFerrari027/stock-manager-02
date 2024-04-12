export interface SKUProps {
  prefix: string
  sequential: number
}

export class SKU {
  protected value: string

  protected constructor(value: string) {
    this.value = value
  }

  static create({ prefix, sequential }: SKUProps) {
    let value = `${prefix.toUpperCase()}`

    if (sequential < 10) value += `00${sequential}`
    else if (sequential < 100) value += `0${sequential}`
    else value += `${sequential}`

    const sku = new SKU(value)

    return sku
  }
}
