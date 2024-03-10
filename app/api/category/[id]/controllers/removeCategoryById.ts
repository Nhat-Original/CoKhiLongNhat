import prisma from '@/prisma'
import { STATUS_CODE } from '@/utils/constant'
import standardResponse from '@/utils/standardResponese'
import { NextRequest, NextResponse } from 'next/server'

const removeCategoryById = async (req: NextRequest) => {
  const id = req.nextUrl.pathname.split('/')[3]

  const foundCategory = await prisma.category.findUnique({
    where: {
      id,
    },
  })

  if (!foundCategory) {
    return NextResponse.json(standardResponse(STATUS_CODE.NOT_FOUND, 'Category not found'), {
      status: STATUS_CODE.NOT_FOUND,
    })
  }

  await prisma.product.updateMany({
    where: {
      categoryId: id,
    },
    data: {
      categoryId: null,
    },
  })

  const deletedCategory = await prisma.category.delete({
    where: {
      id,
    },
  })

  return NextResponse.json(standardResponse(STATUS_CODE.OK, 'Category deleted', deletedCategory), {
    status: STATUS_CODE.OK,
  })
}

export default removeCategoryById
