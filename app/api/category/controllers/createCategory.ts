import { STATUS_CODE } from '@/utils/constant'
import standardResponse from '@/utils/standardResponese'
import simplifyName from '@/utils/simplifyName'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma'
import { CreateCategorySchema, createCategorySchema } from '../schemas/createCategorySchema'

const createCategory = async (req: NextRequest) => {
  const body = (await req.json()) as CreateCategorySchema
  const validation = createCategorySchema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(standardResponse(STATUS_CODE.BAD_REQUEST, 'Request body is invalid'), {
      status: STATUS_CODE.BAD_REQUEST,
    })
  }

  const simplifiedName = simplifyName(body.name)
  const foundCategory = await prisma.category.findUnique({
    where: {
      simplifiedName: simplifiedName,
    },
  })
  if (foundCategory) {
    return NextResponse.json(
      standardResponse(STATUS_CODE.BAD_REQUEST, `Simplified name "${simplifiedName}" already exists`),
      {
        status: STATUS_CODE.BAD_REQUEST,
      },
    )
  }

  const newCategory = await prisma.category.create({
    data: {
      name: body.name,
      simplifiedName: simplifiedName,
      description: body.description,
      isPublished: body.isPublished,
    },
  })

  return NextResponse.json(standardResponse(STATUS_CODE.CREATED, 'New category created', newCategory), {
    status: STATUS_CODE.CREATED,
  })
}

export default createCategory
