import { ProductAttachmentsList } from './../../../enterprise/entities/product-attachments-list'
import { Either, left, right } from '@/core/either'
import { Product } from '../../../enterprise/entities/product'
import { Text } from '@/core/entities/text'
import { inject, injectable } from 'tsyringe'
import { NotFoundError } from '@/core/errors/not-found-error'
import { ProductsRepository } from '../../repositories/products-repository'
import { AlreadyExistsError } from '@/core/errors/already-exists-error'
import { DepartmentsRepository } from '../../repositories/departments-repository'
import { LinesRepository } from '../../repositories/lines-repository'
import { CategoriesRepository } from '../../repositories/categories-repository'
import { TypesRepository } from '../../repositories/types-repository'
import { GridsRepository } from '../../repositories/grids-repository'
import { LevelsRepository } from '../../repositories/levels-repository'
import { SKU } from '@/domain/products/enterprise/entities/SKU'
import { ProductFeedStoksList } from '@/domain/products/enterprise/entities/product-feed-stocks-list'
import { ProductTrimsList } from '@/domain/products/enterprise/entities/product-trims-list'
import { ProductVariationsList } from '@/domain/products/enterprise/entities/product-variations-list'
import { CollectionsRepository } from '../../repositories/collections-repository'
import { ProductCollectionsList } from '@/domain/products/enterprise/entities/product-collections-list'
import { ProductCollection } from '@/domain/products/enterprise/entities/product-collection'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAcceptableError } from '@/core/errors/not-acceptable-error'
import { VariationsRepository } from '../../repositories/variations-repository'
import { Variation } from '@/domain/products/enterprise/entities/variation'
import { ProductVariation } from '@/domain/products/enterprise/entities/product-variation'

interface CreateProductRequest {
  name: string
  SKU?: string
  collectionIds: string[]
  departmentId: string
  lineId: string
  categoryId: string
  typeId: string
  gridId: string
  levelId: string
  variation: number
}

type CreateProductResponse = Either<
  NotFoundError | NotAcceptableError,
  {
    product: Product
  }
>

@injectable()
export class CreateProduct {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: ProductsRepository,
    @inject('VariationsRepository')
    private variationsRepository: VariationsRepository,
    @inject('CollectionsRepository')
    private collectionsRepository: CollectionsRepository,
    @inject('ProductsDepartmentsRepository')
    private departmentsRepository: DepartmentsRepository,
    @inject('LinesRepository')
    private linesRepository: LinesRepository,
    @inject('CategoriesRepository')
    private categoriesRepository: CategoriesRepository,
    @inject('TypesRepository')
    private typesRepository: TypesRepository,
    @inject('GridsRepository')
    private gridsRepository: GridsRepository,
    @inject('LevelsRepository')
    private levelsRepository: LevelsRepository,
  ) {}

  private async generateSequentialByType(id: string): Promise<number> {
    const lastProductOfType = await this.productsRepository.listByType(id, {
      order: 'desc',
      orderBy: 'createdAt',
      take: 1,
    })

    if (!lastProductOfType.data[0]) return 1

    const sequential = lastProductOfType.data[0].SKU.sequential

    return sequential + 1
  }

  async execute(data: CreateProductRequest): Promise<CreateProductResponse> {
    if (data.SKU) {
      const isValid = SKU.isValid(data.SKU)

      if (isValid) {
        const message = `SKU ${SKU} does not meet standards!`
        return left(new NotAcceptableError(message))
      }

      const getBySKU = await this.productsRepository.findBySKU(data.SKU)

      if (getBySKU) {
        const message = `SKU ${data.SKU} already exists!`

        return left(new AlreadyExistsError(message))
      }
    }

    const departmet = await this.departmentsRepository.findById(
      data.departmentId,
    )

    const line = await this.linesRepository.findById(data.lineId)

    const category = await this.categoriesRepository.findById(data.categoryId)

    const type = await this.typesRepository.findById(data.typeId)

    const grid = await this.gridsRepository.findById(data.gridId)

    const level = await this.levelsRepository.findById(data.levelId)

    if (!departmet || !line || !category || !type || !grid || !level) {
      return left(new NotFoundError())
    }

    const sequential = await this.generateSequentialByType(type.id.toString())

    let sku: SKU

    if (data.SKU) {
      const prefix = data.SKU.substring(0, 2)

      const chunk = data.SKU.split('.')

      const sequential = Number(data.SKU.substring(2, chunk[0].length))

      const variation = Number(chunk[2].split('-')[0]) ?? null

      sku = SKU.create({
        categoryId: category.id,
        departmentId: departmet.id,
        lineId: line.id,
        prefix,
        sequential,
        variation,
      })
    } else {
      sku = SKU.create({
        categoryId: category.id,
        departmentId: departmet.id,
        lineId: line.id,
        prefix: type.SKUPrefix,
        sequential,
        variation: data.variation,
      })
    }

    const productId = new UniqueEntityID()

    const collections = new ProductCollectionsList()

    for await (const id of data.collectionIds) {
      const collection = await this.collectionsRepository.findById(id)

      if (!collection) {
        return left(new NotFoundError())
      } else {
        const productCollection = ProductCollection.create({
          collectionId: collection.id,
          productId,
        })

        collections.add(productCollection)
      }
    }

    const name = Text.create(data.name, 'Pascalcase')

    const variationsToCreate: Variation[] = []

    for (let i = 1; i <= grid.sizes.length; i++) {
      const size = grid.sizes[i - 1]

      const variationSKU = SKU.create({
        prefix: sku.prefix,
        sequential: sku.sequential,
        variation: sku.variation,
        categoryId: sku.categoryId,
        departmentId: sku.departmentId,
        lineId: sku.lineId,
        size,
      })

      const variation = Variation.create({
        name,
        SKU: variationSKU,
        isActive: true,
      })

      variationsToCreate.push(variation)
    }

    const variations = new ProductVariationsList()

    for (const variation of variationsToCreate) {
      const productVariation = ProductVariation.create({
        productId,
        variationId: variation.id,
      })

      variations.add(productVariation)
    }

    await this.variationsRepository.createMany(variationsToCreate)

    const product = Product.create(
      {
        name,
        cover: null,
        gridId: grid.id,
        levelId: level.id,
        SKU: sku,
        typeId: type.id,
        collections,
        variations,
        attachments: new ProductAttachmentsList(),
        feedStocks: new ProductFeedStoksList(),
        trims: new ProductTrimsList(),
        isActive: true,
      },
      productId,
    )

    await this.productsRepository.create(product)

    return right({
      product,
    })
  }
}
