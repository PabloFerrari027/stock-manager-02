import { ProductVariationsList } from './../../../src/domain/products/enterprise/entities/product-variations-list'
import { ProductCollectionsList } from './../../../src/domain/products/enterprise/entities/product-collections-list'
import { ProductAttachmentsList } from './../../../src/domain/products/enterprise/entities/product-attachments-list'
import { Text } from '@/core/entities/text'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Product } from '@/domain/products/enterprise/entities/product'
import { SKU } from '@/domain/products/enterprise/entities/SKU'
import { Cover } from '@/domain/products/enterprise/entities/cover'
import { ProductFeedStoksList } from '@/domain/products/enterprise/entities/product-feed-stocks-list'
import { ProductTrimsList } from '@/domain/products/enterprise/entities/product-trims-list'
import { faker } from '@faker-js/faker'

interface MakeProductProps {
  name?: Text
  SKU?: SKU
  cover?: Cover
  categoryId?: UniqueEntityID
  departmentId?: UniqueEntityID
  gridId?: UniqueEntityID
  levelId?: UniqueEntityID
  lineId?: UniqueEntityID
  typeId?: UniqueEntityID
  trims?: ProductTrimsList
  attachments?: ProductAttachmentsList
  collections?: ProductCollectionsList
  feedStocks?: ProductFeedStoksList
  variations?: ProductVariationsList
  isActive?: boolean
  createdAt?: Date
}

export class makeProduct {
  static execute(props: MakeProductProps, id?: UniqueEntityID) {
    const name = props.name ?? Text.create(faker.company.name(), 'Pascalcase')

    const year = new Date().getFullYear().toString().substring(0, 2)

    const sku =
      props.SKU ??
      SKU.create({
        department: 'M',
        prefix: faker.science.chemicalElement().symbol,
        sequential: faker.number.int(),
        year,
      })

    const cover =
      props.cover ??
      Cover.create({
        downloadUrl: faker.internet.url(),
        viewUrl: faker.internet.url(),
        slug: Text.create(faker.lorem.sentence({ min: 10, max: 20 }), 'Slug'),
      })

    const categoryId = props.categoryId ?? new UniqueEntityID()

    const departmentId = props.departmentId ?? new UniqueEntityID()

    const gridId = props.gridId ?? new UniqueEntityID()

    const levelId = props.levelId ?? new UniqueEntityID()

    const lineId = props.lineId ?? new UniqueEntityID()

    const typeId = props.typeId ?? new UniqueEntityID()

    const trims = props.trims ?? new ProductTrimsList()

    const attachments = props.attachments ?? new ProductAttachmentsList()

    const collections = props.collections ?? new ProductCollectionsList()

    const feedStocks = props.feedStocks ?? new ProductFeedStoksList()

    const variations = props.variations ?? new ProductVariationsList()

    const isActive = props.isActive ?? true

    const createdAt = props.createdAt

    const product = Product.create(
      {
        name,
        SKU: sku,
        categoryId,
        departmentId,
        gridId,
        levelId,
        lineId,
        trims,
        typeId,
        attachments,
        collections,
        cover,
        feedStocks,
        variations,
        isActive,
        createdAt,
      },
      id,
    )

    return product
  }
}
