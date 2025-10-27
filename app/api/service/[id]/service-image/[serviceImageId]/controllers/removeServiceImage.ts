import { STATUS_CODE } from '@/utils/constant'
import standardResponse from '@/utils/standardResponese'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma'

const removeServiceImage = async (req: NextRequest) => {
  const serviceId = req.nextUrl.pathname.split('/')[3]
  const serviceImageId = req.nextUrl.pathname.split('/')[5]

  const foundService = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
  })
  if (!foundService) {
    return NextResponse.json(standardResponse(STATUS_CODE.NOT_FOUND, 'Service not found'), {
      status: STATUS_CODE.NOT_FOUND,
    })
  }

  const deletedServiceImage = await prisma.serviceImage.delete({
    where: {
      id: serviceImageId,
    },
  })

  return NextResponse.json(standardResponse(STATUS_CODE.OK, 'Service image deleted', deletedServiceImage), {
    status: STATUS_CODE.OK,
  })
}

export default removeServiceImage
