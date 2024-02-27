import { STATUS_CODE } from '@/utils/constant'
import standardResponse from '@/utils/standardResponese'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma'

const SEARCH_PARAMS = {
  CATEGORY_QUERY: 'phan-loai',
  NAME_QUERY: 'ten',
}

const getProductList = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams
  const categoryQuery = searchParams.get(SEARCH_PARAMS.CATEGORY_QUERY)
  const nameQuery = searchParams.get(SEARCH_PARAMS.NAME_QUERY)

  const productList = await prisma.product.findMany({
    where: {
      category: {
        simplifiedName: categoryQuery || undefined,
      },
      name: {
        contains: nameQuery || '',
      },
    },
  })

  return NextResponse.json(standardResponse(STATUS_CODE.OK, 'Get product list successfully', productList), {
    status: STATUS_CODE.OK,
  })
}

export default getProductList
