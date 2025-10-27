import { STATUS_CODE } from '@/utils/constant'
import standardResponse from '@/utils/standardResponese'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma'

const SEARCH_PARAMS = {
  NAME_QUERY: 'name',
  PUBLISHED_QUERY: 'published',
  LIMIT_QUERY: 'limit',
  OFFSET_QUERY: 'offset',
}

const getServiceList = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams

  const nameQuery = searchParams.get(SEARCH_PARAMS.NAME_QUERY)
  const publishedQuery = searchParams.get(SEARCH_PARAMS.PUBLISHED_QUERY)
  const limitQuery = searchParams.get(SEARCH_PARAMS.LIMIT_QUERY)
  const offsetQuery = searchParams.get(SEARCH_PARAMS.OFFSET_QUERY)

  const serviceList = await prisma.service.findMany({
    where: {
      name: {
        contains: nameQuery || '',
        mode: 'insensitive',
      },
      isPublished: publishedQuery ? publishedQuery === 'true' : undefined,
    },
    include: {
      serviceImages: true,
    },
    orderBy: {
      simplifiedName: 'asc',
    },
    take: limitQuery ? parseInt(limitQuery) : undefined,
    skip: offsetQuery ? parseInt(offsetQuery) : undefined,
  })

  return NextResponse.json(standardResponse(STATUS_CODE.OK, 'Get service list successfully', serviceList), {
    status: STATUS_CODE.OK,
  })
}

export default getServiceList
