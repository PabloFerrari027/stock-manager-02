import { SKU, SKUProps } from './SKU'

export interface VariationSKUProps extends SKUProps {
  variation: number
  size: string
}

export class VariationSKU extends SKU {
  protected value: string

  protected constructor(SKU: string, variationSKU: string) {
    super(SKU)
    this.value = variationSKU
  }

  static create({ prefix, sequential, variation, size }: VariationSKUProps) {
    let SKU = `${prefix.toUpperCase()}`

    if (sequential < 10) SKU += `00${sequential}`
    else if (sequential < 100) SKU += `0${sequential}`
    else SKU += `${sequential}`

    let variationSKU = SKU

    if (variation < 10) variationSKU += `0${variation}`
    else if (variation >= 10) variationSKU += `${variation}`

    variationSKU += size

    const variationsku = new VariationSKU(SKU, variationSKU)

    return variationsku
  }
}
