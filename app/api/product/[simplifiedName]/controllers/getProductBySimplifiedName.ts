import prisma from '@/prisma'
import { STATUS_CODE } from '@/utils/constant'
import standardResponse from '@/utils/standardResponese'
import { NextRequest, NextResponse } from 'next/server'

const getProductBySimplifiedName = async (req: NextRequest) => {
  const simplifiedName = req.nextUrl.pathname.split('/')[3]

  const foundProduct = await prisma.product.findUnique({
    where: {
      simplifiedName,
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

export default getProductBySimplifiedName
