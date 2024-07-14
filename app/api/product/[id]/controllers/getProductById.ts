import prisma from '@/prisma'
import { STATUS_CODE } from '@/utils/constant'
import standardResponse from '@/utils/standardResponese'
import { NextRequest, NextResponse } from 'next/server'

const getProductById = async (req: NextRequest) => {
  const id = req.nextUrl.pathname.split('/')[3]

  const foundProduct = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      productImages: true,
    },
  })

  if (!foundProduct) {
    return NextResponse.json(standardResponse(STATUS_CODE.NOT_FOUND, 'Product not found'), {
      status: STATUS_CODE.NOT_FOUND,
    })
  }

  return NextResponse.json(standardResponse(STATUS_CODE.OK, 'Get product successfully', foundProduct), {
    status: STATUS_CODE.OK,
  })
}

export default getProductById
