import prisma from '@/prisma'
import { STATUS_CODE } from '@/utils/constant'
import standardResponse from '@/utils/standardResponese'
import { NextRequest, NextResponse } from 'next/server'
import simplifyName from '@/utils/simplifyName'
import { UpdateProductSchema, updateProductSchema } from '../schemas/updateProductSchema'

const updateProductById = async (req: NextRequest) => {
  const id = req.nextUrl.pathname.split('/')[3]

  const body = (await req.json()) as UpdateProductSchema
  const validation = updateProductSchema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(standardResponse(STATUS_CODE.BAD_REQUEST, 'Request body is invalid'), {
      status: STATUS_CODE.BAD_REQUEST,
    })
  }

  const foundProduct = await prisma.product.findUnique({
    where: {
      id,
    },
  })
  if (!foundProduct) {
    return NextResponse.json(standardResponse(STATUS_CODE.NOT_FOUND, 'Product not found'), {
      status: STATUS_CODE.NOT_FOUND,
    })
  }

  const newSimplifiedName = body.name ? simplifyName(body.name) : undefined
  const isSimplifiedNameExist = await prisma.product.findUnique({
    where: {
      NOT: {
        id: foundProduct.id,
      },
      simplifiedName: newSimplifiedName,
    },
  })
  if (isSimplifiedNameExist) {
    return NextResponse.json(
      standardResponse(STATUS_CODE.BAD_REQUEST, `Simplified name "${newSimplifiedName}" already exists`),
      {
        status: STATUS_CODE.BAD_REQUEST,
      },
    )
  }

  const updatedProduct = await prisma.product.update({
    where: {
      id,
    },
    data: {
      categoryId: body.categoryId === '0' ? null : body.categoryId,
      name: body.name,
      simplifiedName: newSimplifiedName,
      description: body.description,
      status: body.status,
      price: body.price,
      quantity: body.quantity,
      unit: body.unit,
      isPublished: body.isPublished,
    },
  })

  return NextResponse.json(standardResponse(STATUS_CODE.OK, 'Product updated', updatedProduct), {
    status: STATUS_CODE.OK,
  })
}

export default updateProductById
