import { NotImplementedError } from '@/core/errors/not-implemented-error'

type Type = 'Uppercase' | 'Lowercase' | 'Pascalcase'

export class Name {
  protected value: string

  constructor(value: string) {
    this.value = value
  }

  private static uppercase(value: string): string {
    return value.toUpperCase()
  }

  private static lowercase(value: string): string {
    return value.toLowerCase()
  }

  private static pascalcase(value: string): string {
    const chunks = value.split(' ')

    const result = chunks.map((chunk) => this.lowercase(chunk)).join(' ')

    return result
  }

  static create(value: string, type: Type): Name {
    switch (type) {
      case 'Lowercase': {
        const toLowerCase = this.lowercase(value)

        const name = new Name(toLowerCase)

        return name
      }

      case 'Pascalcase': {
        const toLowerCase = this.pascalcase(value)

        const name = new Name(toLowerCase)

        return name
      }

      case 'Uppercase': {
        const toLowerCase = this.uppercase(value)

        const name = new Name(toLowerCase)

        return name
      }

      default: {
        throw new NotImplementedError()
      }
    }
  }
}
