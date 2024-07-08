import { STATUS_CODE } from '@/utils/constant'
import standardResponse from '@/utils/standardResponese'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma'

const removeProductImage = async (req: NextRequest) => {
  const productId = req.nextUrl.pathname.split('/')[3]
  const productImageId = req.nextUrl.pathname.split('/')[5]

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

  const deletedProductImage = await prisma.productImage.delete({
    where: {
      id: productImageId,
    },
  })

  return NextResponse.json(standardResponse(STATUS_CODE.OK, 'Product image deleted', deletedProductImage), {
    status: STATUS_CODE.OK,
  })
}

export default removeProductImage
