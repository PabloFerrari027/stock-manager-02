import { ProductAttachmentsList } from './../../../enterprise/entities/product-attachments-list'
import { Either, left, right } from '@/core/either'
import { Product } from '../../../enterprise/entities/product'
import { Text } from '@/core/entities/text'
import { inject, injectable } from 'tsyringe'
import { NotFoundError } from '@/core/errors/not-found-error'
import { ProductsRepository } from '../../repositories/products-repository'
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
import { SKURepository } from '../../repositories/SKU-repository'
import { DepartmentsRepository } from '../../repositories/departments-repository'
import { LinesRepository } from '../../repositories/lines-repository'
import { CategoriesRepository } from '../../repositories/categories-repository'
import { TypesRepository } from '../../repositories/types-repository'

interface CreateProductRequest {
  name: string
  departmentId: string
  lineId: string
  categoryId: string
  typeId: string
  gridId: string
  levelId: string
  variation?: number | null
  collectionIds: string[]
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
    @inject('SKUDepartmentsRepository')
    private departmentsRepository: DepartmentsRepository,
    @inject('LinesRepository')
    private linesRepository: LinesRepository,
    @inject('CategoriesRepository')
    private categoriesRepository: CategoriesRepository,
    @inject('TypesRepository')
    private typesRepository: TypesRepository,
    @inject('ProductsRepository')
    private productsRepository: ProductsRepository,
    @inject('SKURepository')
    private SKURepository: SKURepository,
    @inject('VariationsRepository')
    private variationsRepository: VariationsRepository,
    @inject('CollectionsRepository')
    private collectionsRepository: CollectionsRepository,
    @inject('GridsRepository')
    private gridsRepository: GridsRepository,
    @inject('LevelsRepository')
    private levelsRepository: LevelsRepository,
  ) {}

  private async generateSequentialByCategory(id: string): Promise<number> {
    const lastSKUOfType = await this.SKURepository.listByType(id, {
      order: 'desc',
      orderBy: 'createdAt',
      take: 1,
    })

    if (!lastSKUOfType.data[0]) return 1

    const sequential = lastSKUOfType.data[0].sequential

    return sequential + 1
  }

  async execute(data: CreateProductRequest): Promise<CreateProductResponse> {
    const departmet = await this.departmentsRepository.findById(
      data.departmentId,
    )

    const line = await this.linesRepository.findById(data.lineId)

    const category = await this.categoriesRepository.findById(data.categoryId)

    const type = await this.typesRepository.findById(data.typeId)

    if (!departmet || !line || !category || !type) {
      return left(new NotFoundError())
    }

    let sequential = await this.generateSequentialByCategory(type.id.toString())

    const variation = data.variation

    const sku = SKU.create({
      categoryId: category.id,
      typeId: type.id,
      departmentId: departmet.id,
      lineId: line.id,
      prefix: type.SKUPrefix,
      sequential,
      variation,
    })

    await this.SKURepository.create(sku)
    const grid = await this.gridsRepository.findById(data.gridId)

    if (!grid) {
      return left(new NotFoundError())
    }

    const level = await this.levelsRepository.findById(data.levelId)

    if (!level) {
      return left(new NotFoundError())
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
        typeId: sku.typeId,
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
