import { NotImplementedError } from '@/core/errors/not-implemented-error'
import { ListingResponse } from '@/core/types/listing-response'
import { PaginationParams } from '@/core/types/pagination-params'
import { ProductsRepository } from '@/domain/products/application/repositories/products-repository'
import { Product } from '@/domain/products/enterprise/entities/product'

export class InMemoryProductsRepository implements ProductsRepository {
  private items: Product[] = []

  async create(data: Product): Promise<void> {
    this.items.push(data)
  }

  async save(answer: Product): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items[itemIndex] = answer
  }

  async findById(id: string): Promise<Product | null> {
    return this.items.find((i) => i.id.toString() === id) ?? null
  }

  async findBySKU(SKU: string): Promise<Product | null> {
    return this.items.find((i) => i.SKU.value === SKU) ?? null
  }

  async list(options: PaginationParams): Promise<ListingResponse<Product>> {
    const skip = options?.skip || 0
    const take = options?.take || 100
    const orderBy = options?.orderBy || 'createdAt'
    const order = options?.order || 'desc'

    const data = this.items.slice(skip, skip + take).sort((a, b) => {
      switch (orderBy) {
        case 'createdAt': {
          const dateA = a.createdAt.getTime()
          const dateB = b.createdAt.getTime()

          if (order === 'desc') {
            return dateB - dateA
          } else {
            return dateA - dateB
          }
        }

        default: {
          throw new NotImplementedError()
        }
      }
    })

    const hasNext = this.items.length > skip + take

    return { data, hasNext }
  }

  async listByType(
    id: string,
    options: PaginationParams,
  ): Promise<ListingResponse<Product>> {
    const skip = options?.skip || 0
    const take = options?.take || 100
    const orderBy = options?.orderBy || 'createdAt'
    const order = options?.order || 'desc'

    const data = this.items
      .filter((i) => i.typeId === id)
      .slice(skip, skip + take)
      .sort((a, b) => {
        switch (orderBy) {
          case 'createdAt': {
            const dateA = a.createdAt.getTime()
            const dateB = b.createdAt.getTime()

            if (order === 'desc') {
              return dateB - dateA
            } else {
              return dateA - dateB
            }
          }

          default: {
            throw new NotImplementedError()
          }
        }
      })

    const hasNext = this.items.length > skip + take

    return { data, hasNext }
  }
}
