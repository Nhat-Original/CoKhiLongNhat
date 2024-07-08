import { STATUS_CODE } from '@/utils/constant'
import standardResponse from '@/utils/standardResponese'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma'

const SEARCH_PARAMS = {
  CATEGORY_QUERY: 'category',
  NAME_QUERY: 'name',
  PUBLISHED_QUERY: 'published',
  LIMIT_QUERY: 'limit',
}

const getProductList = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams
  const categoryQuery = searchParams.get(SEARCH_PARAMS.CATEGORY_QUERY)
  const nameQuery = searchParams.get(SEARCH_PARAMS.NAME_QUERY)
  const publishedQuery = searchParams.get(SEARCH_PARAMS.PUBLISHED_QUERY)
  const limitQuery = searchParams.get(SEARCH_PARAMS.LIMIT_QUERY)

  let categoryFilter
  if (categoryQuery) {
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
      isPublished: publishedQuery ? publishedQuery === 'true' : undefined,
    },
    include: {
      category: true,
      productImages: true,
    },
    orderBy: {
      simplifiedName: 'asc',
    },
    take: limitQuery ? parseInt(limitQuery) : undefined,
  })

  return NextResponse.json(standardResponse(STATUS_CODE.OK, 'Get product list successfully', productList), {
    status: STATUS_CODE.OK,
  })
}

export default getProductList
