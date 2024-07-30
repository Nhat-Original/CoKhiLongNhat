import { NextRequest, NextResponse } from 'next/server'
import { LoginSchema, loginSchema } from '../schemas/loginSchema'
import standardResponse from '@/utils/standardResponese'
import { ENV, STATUS_CODE } from '@/utils/constant'
import { SignJWT } from 'jose'
import prisma from '@/prisma'
import bcrypt from 'bcrypt'

const login = async (req: NextRequest) => {
  const body = (await req.json()) as LoginSchema
  const validation = loginSchema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(standardResponse(STATUS_CODE.BAD_REQUEST, 'Request body is invalid'), {
      status: STATUS_CODE.BAD_REQUEST,
    })
  }

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  })

  if (!user) {
    return NextResponse.json(standardResponse(STATUS_CODE.NOT_FOUND, 'User does not exist'), {
      status: STATUS_CODE.NOT_FOUND,
    })
  }

  if (!user.hashedPassword) {
    return NextResponse.json(standardResponse(STATUS_CODE.BAD_REQUEST, 'User account existed in other providers'), {
      status: STATUS_CODE.BAD_REQUEST,
    })
  }

  if (!(await bcrypt.compare(body.password, user.hashedPassword))) {
    return NextResponse.json(standardResponse(STATUS_CODE.UNAUTHORIZED, 'Password is incorrect'), {
      status: STATUS_CODE.UNAUTHORIZED,
    })
  }

  const token = await new SignJWT({
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    role: user.role,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(new TextEncoder().encode(ENV.JWT_SECRET))

  const res = NextResponse.json(
    standardResponse(STATUS_CODE.OK, 'Login success', {
      token,
    }),
    {
      status: STATUS_CODE.OK,
    },
  )

  res.cookies.set({
    name: 'token',
    value: token,
    maxAge: 60 * 60 * 24,
  })

  return res
}

export default login
