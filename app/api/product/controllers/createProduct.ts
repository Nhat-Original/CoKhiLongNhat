import { STATUS_CODE } from '@/utils/constant'
import standardResponse from '@/utils/standardResponese'
import simplifyName from '@/utils/simplifyName'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma'
import { CreateProductSchema, createProductSchema } from '../schemas/createProductSchema'

const createProduct = async (req: NextRequest) => {
  const body = (await req.json()) as CreateProductSchema
  const validation = createProductSchema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(standardResponse(STATUS_CODE.BAD_REQUEST, 'Request body is invalid'), {
      status: STATUS_CODE.BAD_REQUEST,
    })
  }

  const foundCategory = await prisma.category.findUnique({
    where: {
      id: body.categoryId || undefined,
    },
  })
  if (!foundCategory) {
    return NextResponse.json(standardResponse(STATUS_CODE.NOT_FOUND, 'Category not found'), {
      status: STATUS_CODE.NOT_FOUND,
    })
  }
  if (!foundCategory.isPublished && body.isPublished) {
    return NextResponse.json(
      standardResponse(STATUS_CODE.BAD_REQUEST, 'Cannot publish product if category is not published'),
      {
        status: STATUS_CODE.BAD_REQUEST,
      },
    )
  }

  const simplifiedName = simplifyName(body.name)
  const foundProduct = await prisma.product.findUnique({
    where: {
      simplifiedName: simplifiedName,
    },
  })
  if (foundProduct) {
    return NextResponse.json(
      standardResponse(STATUS_CODE.BAD_REQUEST, `Simplified name "${simplifiedName}" already exists`),
      {
        status: STATUS_CODE.BAD_REQUEST,
      },
    )
  }

  const newProduct = await prisma.product.create({
    data: {
      categoryId: body.categoryId,
      name: body.name,
      simplifiedName: simplifiedName,
      description: body.description,
      status: body.status,
      price: body.price,
      quantity: body.quantity,
      unit: body.unit,
      isPublished: body.isPublished,
    },
  })

  if (body.productImages && body.productImages.length > 0) {
    prisma.productImage.createMany({
      data: body.productImages.map((url) => ({
        productId: newProduct.id,
        url: url,
      })),
    })
  }

  return NextResponse.json(standardResponse(STATUS_CODE.CREATED, 'New product created', newProduct), {
    status: STATUS_CODE.CREATED,
  })
}

export default createProduct
