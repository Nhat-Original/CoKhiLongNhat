import prisma from '@/prisma'
import { STATUS_CODE } from '@/utils/constant'
import standardResponse from '@/utils/standardResponese'
import { NextRequest, NextResponse } from 'next/server'
import { UpdateCategorySchema, updateCategorySchema } from '../schemas/updateCategorySchema'
import simplifyName from '@/utils/simplifyName'

const updateCategoryBySimplifiedName = async (req: NextRequest) => {
  const simplifiedName = req.nextUrl.pathname.split('/')[3]

  const body = (await req.json()) as UpdateCategorySchema
  const validation = updateCategorySchema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(standardResponse(STATUS_CODE.BAD_REQUEST, 'request body is invalid'), {
      status: STATUS_CODE.BAD_REQUEST,
    })
  }

  const foundRecord = await prisma.category.findUnique({
    where: {
      simplifiedName,
    },
  })

  if (!foundRecord) {
    return NextResponse.json(standardResponse(STATUS_CODE.NOT_FOUND, 'Category not found'), {
      status: STATUS_CODE.NOT_FOUND,
    })
  }

  const updatedCategory = await prisma.category.update({
    where: {
      simplifiedName,
    },
    data: {
      name: body.name,
      simplifiedName: body.name ? simplifyName(body.name) : undefined,
      description: body.description,
      isPublished: body.isPublished,
    },
  })

  return NextResponse.json(standardResponse(STATUS_CODE.OK, 'Category updated', updatedCategory), {
    status: STATUS_CODE.OK,
  })
}

export default updateCategoryBySimplifiedName
