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
    return NextResponse.json(standardResponse(STATUS_CODE.BAD_REQUEST, 'request body is invalid'), {
      status: STATUS_CODE.BAD_REQUEST,
    })
  }

  const newCategory = await prisma.category.create({
    data: {
      name: body.name,
      simplifiedName: simplifyName(body.name),
      description: body.description,
      isPublished: body.isPublished,
    },
  })

  return NextResponse.json(standardResponse(STATUS_CODE.CREATED, 'new category created', newCategory), {
    status: STATUS_CODE.CREATED,
  })
}

export default createCategory
