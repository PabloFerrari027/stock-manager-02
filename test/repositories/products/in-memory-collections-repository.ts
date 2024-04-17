import { NotImplementedError } from '@/core/errors/not-implemented-error'
import { ListingResponse } from '@/core/types/listing-response'
import { PaginationParams } from '@/core/types/pagination-params'
import { CollectionsRepository } from '@/domain/products/application/repositories/collections-repository'
import { Collection } from '@/domain/products/enterprise/entities/collection'

export class InMemoryCollectionsRepository implements CollectionsRepository {
  private items: Collection[] = []

  async create(data: Collection): Promise<void> {
    this.items.push(data)
  }

  async save(answer: Collection): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items[itemIndex] = answer
  }

  async findById(id: string): Promise<Collection | null> {
    return this.items.find((i) => i.id.toString() === id) ?? null
  }

  async findByName(name: string): Promise<Collection | null> {
    return this.items.find((i) => i.name.value === name) ?? null
  }

  async list(options: PaginationParams): Promise<ListingResponse<Collection>> {
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
