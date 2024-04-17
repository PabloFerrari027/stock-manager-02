import { NotImplementedError } from '@/core/errors/not-implemented-error'
import { ListingResponse } from '@/core/types/listing-response'
import { PaginationParams } from '@/core/types/pagination-params'
import { SuppliersRepository } from '@/domain/materials/application/repositories/suppliers-repository'
import { Supplier } from '@/domain/materials/enterprise/entities/supplier'

export class InMemorySuppliersRepository implements SuppliersRepository {
  private items: Supplier[] = []

  async create(data: Supplier): Promise<void> {
    this.items.push(data)
  }

  async save(answer: Supplier): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items[itemIndex] = answer
  }

  async findById(id: string): Promise<Supplier | null> {
    return this.items.find((i) => i.id.toString() === id) ?? null
  }

  async list(options: PaginationParams): Promise<ListingResponse<Supplier>> {
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
}
