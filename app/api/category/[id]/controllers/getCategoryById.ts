import prisma from '@/prisma'
import { STATUS_CODE } from '@/utils/constant'
import standardResponse from '@/utils/standardResponese'
import { NextRequest, NextResponse } from 'next/server'

const getCategoryById = async (req: NextRequest) => {
  const id = req.nextUrl.pathname.split('/')[3]

  const foundCategory = await prisma.category.findUnique({
    where: {
      id: id,
    },
    include: {
      _count: {
        select: { products: true },
      },
    },
  })

  if (!foundCategory) {
    return NextResponse.json(standardResponse(STATUS_CODE.NOT_FOUND, 'Category not found'), {
      status: STATUS_CODE.NOT_FOUND,
    })
  }

  return NextResponse.json(standardResponse(STATUS_CODE.OK, 'Get category successfully', foundCategory), {
    status: STATUS_CODE.OK,
  })
}

export default getCategoryById
