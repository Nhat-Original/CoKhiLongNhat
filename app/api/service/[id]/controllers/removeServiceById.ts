import prisma from '@/prisma'
import { STATUS_CODE } from '@/utils/constant'
import standardResponse from '@/utils/standardResponese'
import { NextRequest, NextResponse } from 'next/server'

const removeServiceById = async (req: NextRequest) => {
  const id = req.nextUrl.pathname.split('/')[3]

  const foundService = await prisma.service.findUnique({
    where: {
      id,
    },
  })

  if (!foundService) {
    return NextResponse.json(standardResponse(STATUS_CODE.NOT_FOUND, 'Service not found'), {
      status: STATUS_CODE.NOT_FOUND,
    })
  }

  await prisma.serviceImage.deleteMany({
    where: {
      serviceId: id,
    },
  })

  const serviceDeleted = await prisma.service.delete({
    where: {
      id,
    },
  })

  return NextResponse.json(standardResponse(STATUS_CODE.OK, 'Service deleted', serviceDeleted), {
    status: STATUS_CODE.OK,
  })
}

export default removeServiceById
