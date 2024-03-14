import { STATUS_CODE } from '@/utils/constant'
import standardResponse from '@/utils/standardResponese'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma'

const SEARCH_PARAMS = {
  PUBLISHED_QUERY: 'is-published',
  CATEGORY_QUERY: 'category',
  NAME_QUERY: 'name',
  LIMIT_QUERY: 'limit',
}

const getProductList = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams
  const categoryQuery = searchParams.get(SEARCH_PARAMS.CATEGORY_QUERY)
  const nameQuery = searchParams.get(SEARCH_PARAMS.NAME_QUERY)
  const publishedQuery = searchParams.get(SEARCH_PARAMS.PUBLISHED_QUERY)
  const limitQuery = searchParams.get(SEARCH_PARAMS.LIMIT_QUERY)

  const productList = await prisma.product.findMany({
    where: {
      isPublished: publishedQuery === 'true' ? true : publishedQuery === 'false' ? false : undefined,
      category: {
        simplifiedName: categoryQuery || undefined,
      },
      name: {
        contains: nameQuery || '',
      },
    },
    include: {
      productImages: true,
    },
    take: limitQuery ? parseInt(limitQuery) : undefined,
  })

  return NextResponse.json(standardResponse(STATUS_CODE.OK, 'Get product list successfully', productList), {
    status: STATUS_CODE.OK,
  })
}

export default getProductList
