import { STATUS_CODE } from '@/utils/constant'
import standardResponse from '@/utils/standardResponese'
import { NextResponse } from 'next/server'
import prisma from '@/prisma'

const getCategoryList = async () => {
  const categoryList = await prisma.category.findMany()

  return NextResponse.json(standardResponse(STATUS_CODE.OK, 'Get category list successfully', categoryList), {
    status: STATUS_CODE.OK,
  })
}

export default getCategoryList
