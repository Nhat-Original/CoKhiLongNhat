import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { ROLE } from '@prisma/client'
import { NextResponse } from 'next/server'
import { ENV, STATUS_CODE } from '@/utils/constant'
import StandardResponse from '@/utils/types/StandardResponse'

const verifySession = async (req: any, next: any) => {
  if (ENV.NODE_ENV === 'development') {
    next()
  }

  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json(
      {
        statusCode: STATUS_CODE.UNAUTHORIZED,
        message: 'Unauthorized',
        data: null,
      } satisfies StandardResponse,
      { status: STATUS_CODE.UNAUTHORIZED },
    )
  }

  if (session.user.role !== ROLE.ADMIN) {
    return NextResponse.json(
      {
        statusCode: STATUS_CODE.FORBIDDEN,
        message: 'Forbidden',
        data: null,
      } satisfies StandardResponse,
      { status: STATUS_CODE.FORBIDDEN },
    )
  }

  next()
}

export default verifySession
