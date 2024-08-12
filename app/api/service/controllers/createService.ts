import { STATUS_CODE } from '@/utils/constant'
import standardResponse from '@/utils/standardResponese'
import simplifyName from '@/utils/simplifyName'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma'
import { CreateServiceSchema, createServiceSchema } from '../schemas/createServiceSchema'

const createService = async (req: NextRequest) => {
  const body = (await req.json()) as CreateServiceSchema
  const validation = createServiceSchema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(standardResponse(STATUS_CODE.BAD_REQUEST, 'Request body is invalid'), {
      status: STATUS_CODE.BAD_REQUEST,
    })
  }

  const simplifiedName = simplifyName(body.name)
  const foundService = await prisma.service.findUnique({
    where: {
      simplifiedName: simplifiedName,
    },
  })
  if (foundService) {
    return NextResponse.json(
      standardResponse(STATUS_CODE.BAD_REQUEST, `Simplified name "${simplifiedName}" already exists`),
      {
        status: STATUS_CODE.BAD_REQUEST,
      },
    )
  }

  const newService = await prisma.service.create({
    data: {
      name: body.name,
      simplifiedName: simplifiedName,
      description: body.description,
      isPublished: body.isPublished,
    },
  })

  return NextResponse.json(standardResponse(STATUS_CODE.CREATED, 'New service created', newService), {
    status: STATUS_CODE.CREATED,
  })
}

export default createService
