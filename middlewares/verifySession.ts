import { getServerSession } from 'next-auth'
import authOptions from '@/utils/authOptions'
import { ROLE } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { ENV, STATUS_CODE } from '@/utils/constant'
import standardResponse from '@/utils/standardResponese'
import { jwtVerify } from 'jose'

// const isLoginPage = (url: string) => url.startsWith('/dang-nhap')

const verifySession = async (req: NextRequest, next: any) => {
  if (ENV.NODE_ENV === 'development') {
    next()
  }

  const session = await getServerSession(authOptions)
  const { value: token } = req.cookies.get('token') || { value: '' }

  if (!session?.user && !token) {
    return NextResponse.json(standardResponse(STATUS_CODE.UNAUTHORIZED, 'Unauthorized', null), {
      status: STATUS_CODE.UNAUTHORIZED,
    })
  } else if (session && session.user) {
    // access by google session
    if (session.user.role !== ROLE.ADMIN) {
      return NextResponse.json(standardResponse(STATUS_CODE.FORBIDDEN, 'Forbidden', null), {
        status: STATUS_CODE.FORBIDDEN,
      })
    }

    next()
  } else {
    // access by token
    try {
      const { payload } = await jwtVerify(token, new TextEncoder().encode(ENV.JWT_SECRET))

      if (payload.role !== ROLE.ADMIN) {
        return NextResponse.json(standardResponse(STATUS_CODE.FORBIDDEN, 'Forbidden', null), {
          status: STATUS_CODE.FORBIDDEN,
        })
      }
    } catch (error) {
      const res = NextResponse.redirect('/login', { status: STATUS_CODE.UNAUTHORIZED, statusText: 'Unauthorized' })

      res.cookies.delete('token')

      return res
    }

    next()
  }
}

export default verifySession
