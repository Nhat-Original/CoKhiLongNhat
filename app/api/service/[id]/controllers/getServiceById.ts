import prisma from '@/prisma'
import { STATUS_CODE } from '@/utils/constant'
import standardResponse from '@/utils/standardResponese'
import { NextRequest, NextResponse } from 'next/server'

const getServiceById = async (req: NextRequest) => {
  const id = req.nextUrl.pathname.split('/')[3]

  const foundService = await prisma.service.findUnique({
    where: {
      id,
    },
    include: {
      serviceImages: true,
    },
  })

  if (!foundService) {
    return NextResponse.json(standardResponse(STATUS_CODE.NOT_FOUND, 'Service not found'), {
      status: STATUS_CODE.NOT_FOUND,
    })
  }

  return NextResponse.json(standardResponse(STATUS_CODE.OK, 'Get service successfully', foundService), {
    status: STATUS_CODE.OK,
  })
}

export default getServiceById
