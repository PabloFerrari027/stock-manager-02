import { NotImplementedError } from '@/core/errors/not-implemented-error'

type Type = 'Uppercase' | 'Lowercase' | 'Pascalcase' | 'Slug'

export class Text {
  protected _value: string

  constructor(value: string) {
    this._value = value
  }

  get value(): string {
    return this._value
  }

  private static slug(value: string): string {
    const result = value
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/-$/g, '')

    return result
  }

  private static uppercase(value: string): string {
    return value.toUpperCase()
  }

  private static lowercase(value: string): string {
    return value.toLowerCase()
  }

  private static pascalcase(value: string): string {
    const chunks = value.split(' ')

    const result = chunks
      .map((chunk) => {
        const firistWord = chunk.split('')[0]

        const rest = chunk.substring(1, chunk.length)

        const toLowerCase = this.lowercase(rest)

        const toUpperCase = this.uppercase(firistWord)

        const result = `${toUpperCase}${toLowerCase}`
        return result
      })
      .join(' ')

    return result
  }

  static create(value: string, type: Type): Text {
    switch (type) {
      case 'Slug': {
        const toSlug = this.slug(value)

        const text = new Text(toSlug)

        return text
      }

      case 'Lowercase': {
        const toLowerCase = this.lowercase(value)

        const text = new Text(toLowerCase)

        return text
      }

      case 'Pascalcase': {
        const toPascalcase = this.pascalcase(value)

        const text = new Text(toPascalcase)

        return text
      }

      case 'Uppercase': {
        const toUppercase = this.uppercase(value)

        const text = new Text(toUppercase)

        return text
      }

      default: {
        throw new NotImplementedError()
      }
    }
  }
}
