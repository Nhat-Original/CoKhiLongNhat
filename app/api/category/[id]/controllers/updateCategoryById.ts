import prisma from '@/prisma'
import { STATUS_CODE } from '@/utils/constant'
import standardResponse from '@/utils/standardResponese'
import { NextRequest, NextResponse } from 'next/server'
import { UpdateCategorySchema, updateCategorySchema } from '../schemas/updateCategorySchema'
import simplifyName from '@/utils/simplifyName'

const updateCategoryById = async (req: NextRequest) => {
  const id = req.nextUrl.pathname.split('/')[3]

  const body = (await req.json()) as UpdateCategorySchema
  const validation = updateCategorySchema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(standardResponse(STATUS_CODE.BAD_REQUEST, 'Request body is invalid'), {
      status: STATUS_CODE.BAD_REQUEST,
    })
  }

  const foundCategory = await prisma.category.findUnique({
    where: {
      id,
    },
  })
  if (!foundCategory) {
    return NextResponse.json(standardResponse(STATUS_CODE.NOT_FOUND, 'Category not found'), {
      status: STATUS_CODE.NOT_FOUND,
    })
  }

  const newSimplifiedName = body.name ? simplifyName(body.name) : undefined
  const isSimplifiedNameExist = await prisma.category.findUnique({
    where: {
      NOT: {
        id: foundCategory.id,
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

  const updatedCategory = await prisma.category.update({
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

  return NextResponse.json(standardResponse(STATUS_CODE.OK, 'Category updated', updatedCategory), {
    status: STATUS_CODE.OK,
  })
}

export default updateCategoryById
