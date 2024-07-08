import { STATUS_CODE } from '@/utils/constant'
import standardResponse from '@/utils/standardResponese'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma'
import { CreateProductImageSchema, createProducImageSchema } from '../schemas/createProductImageSchema'

const createProductImage = async (req: NextRequest) => {
  const productId = req.nextUrl.pathname.split('/')[3]

  const body = (await req.json()) as CreateProductImageSchema
  const validation = createProducImageSchema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(standardResponse(STATUS_CODE.BAD_REQUEST, 'Request body is invalid'), {
      status: STATUS_CODE.BAD_REQUEST,
    })
  }

  const foundProduct = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  })
  if (!foundProduct) {
    return NextResponse.json(standardResponse(STATUS_CODE.NOT_FOUND, 'Product not found'), {
      status: STATUS_CODE.NOT_FOUND,
    })
  }

  const newProductImage = await prisma.productImage.create({
    data: {
      productId,
      url: body.url,
    },
  })

  return NextResponse.json(standardResponse(STATUS_CODE.OK, 'Product image created', newProductImage), {
    status: STATUS_CODE.CREATED,
  })
}

export default createProductImage
