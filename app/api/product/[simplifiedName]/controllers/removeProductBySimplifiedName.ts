import prisma from '@/prisma'
import { STATUS_CODE } from '@/utils/constant'
import standardResponse from '@/utils/standardResponese'
import { NextRequest, NextResponse } from 'next/server'

const removeProductBySimplifiedName = async (req: NextRequest) => {
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

  const deletedProduct = await prisma.product.delete({
    where: {
      simplifiedName,
    },
  })

  await prisma.productImage.deleteMany({
    where: {
      productId: deletedProduct.id,
    },
  })

  return NextResponse.json(standardResponse(STATUS_CODE.OK, 'Product deleted', deletedProduct), {
    status: STATUS_CODE.OK,
  })
}

export default removeProductBySimplifiedName
