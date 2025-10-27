import prisma from '@/prisma'
import { STATUS_CODE } from '@/utils/constant'
import standardResponse from '@/utils/standardResponese'
import { NextRequest, NextResponse } from 'next/server'
import simplifyName from '@/utils/simplifyName'
import { UpdateServiceSchema, updateServiceSchema } from '../schemas/updateServiceSchema'

const updateServiceById = async (req: NextRequest) => {
  const id = req.nextUrl.pathname.split('/')[3]

  const body = (await req.json()) as UpdateServiceSchema
  const validation = updateServiceSchema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(standardResponse(STATUS_CODE.BAD_REQUEST, 'Request body is invalid'), {
      status: STATUS_CODE.BAD_REQUEST,
    })
  }

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

  const newSimplifiedName = body.name ? simplifyName(body.name) : undefined
  const isSimplifiedNameExist = await prisma.service.findUnique({
    where: {
      NOT: {
        id: foundService.id,
      },
      simplifiedName: newSimplifiedName,
    },
  })
  if (isSimplifiedNameExist) {
    return NextResponse.json(
      standardResponse(STATUS_CODE.BAD_REQUEST, `Simplified name "${newSimplifiedName}" already exists`),
      {
        status: STATUS_CODE.BAD_REQUEST,
      },
    )
  }

  const updatedService = await prisma.service.update({
    where: {
      id,
    },
    data: {
      name: body.name,
      simplifiedName: newSimplifiedName,
      description: body.description,
      isPublished: body.isPublished,
    },
  })

  return NextResponse.json(standardResponse(STATUS_CODE.OK, 'Service updated', updatedService), {
    status: STATUS_CODE.OK,
  })
}

export default updateServiceById
