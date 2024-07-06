import { STATUS_CODE } from '@/utils/constant'
import standardResponse from '@/utils/standardResponese'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma'

const SEARCH_PARAMS = {
  CATEGORY_QUERY: 'category',
  NAME_QUERY: 'name',
}

const getProductList = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams
  const categoryQuery = searchParams.get(SEARCH_PARAMS.CATEGORY_QUERY)
  const nameQuery = searchParams.get(SEARCH_PARAMS.NAME_QUERY)

  let categoryFilter
  if (categoryQuery != '*' && categoryQuery != '0') {
    categoryFilter = {
      simplifiedName: categoryQuery || '',
    }
  } else if (categoryQuery == '0') {
    categoryFilter = {
      is: null,
    }
  } else {
    categoryFilter = {}
  }

  const productList = await prisma.product.findMany({
    where: {
      category: categoryFilter,
      name: {
        contains: nameQuery || '',
        mode: 'insensitive',
      },
    },
    include: {
      category: true,
    },
    orderBy: {
      simplifiedName: 'asc',
    },
  })

  return NextResponse.json(standardResponse(STATUS_CODE.OK, 'Get product list successfully', productList), {
    status: STATUS_CODE.OK,
  })
}

export default getProductList
