import { getServerSession } from 'next-auth'
import authOptions from '@/utils/authOptions'
import { ROLE } from '@prisma/client'
import { NextResponse } from 'next/server'
import { ENV, STATUS_CODE } from '@/utils/constant'
import standardResponse from '@/utils/standardResponese'

const verifySession = async (req: any, next: any) => {
  if (ENV.NODE_ENV === 'development') {
    next()
  }

  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json(standardResponse(STATUS_CODE.UNAUTHORIZED, 'Unauthorized', null), {
      status: STATUS_CODE.UNAUTHORIZED,
    })
  }

  if (session.user.role !== ROLE.ADMIN) {
    return NextResponse.json(standardResponse(STATUS_CODE.FORBIDDEN, 'Forbidden', null), {
      status: STATUS_CODE.FORBIDDEN,
    })
  }

  next()
}

export default verifySession
