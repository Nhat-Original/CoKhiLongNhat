import { STATUS_CODE } from '@/utils/constant'
import standardResponse from '@/utils/standardResponese'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma'
import { CreateServiceImageSchema, createServiceImageSchema } from '../schemas/createServiceImageSchema'

const createServiceImage = async (req: NextRequest) => {
  const serviceId = req.nextUrl.pathname.split('/')[3]

  const body = (await req.json()) as CreateServiceImageSchema
  const validation = createServiceImageSchema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(standardResponse(STATUS_CODE.BAD_REQUEST, 'Request body is invalid'), {
      status: STATUS_CODE.BAD_REQUEST,
    })
  }

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

  const newServiceImage = await prisma.serviceImage.create({
    data: {
      serviceId,
      url: body.url,
    },
  })

  return NextResponse.json(standardResponse(STATUS_CODE.OK, 'Service image created', newServiceImage), {
    status: STATUS_CODE.CREATED,
  })
}

export default createServiceImage
