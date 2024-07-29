import { NextRequest, NextResponse } from 'next/server'
import standardResponse from '@/utils/standardResponese'
import { ENV, STATUS_CODE } from '@/utils/constant'
import { jwtVerify } from 'jose'

const getMe = async (req: NextRequest) => {
  const { value: token } = req.cookies.get('token') || { value: '' }

  if (!token) {
    return NextResponse.json(standardResponse(STATUS_CODE.UNAUTHORIZED, 'Unauthorized', null), {
      status: STATUS_CODE.UNAUTHORIZED,
    })
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(ENV.JWT_SECRET))

    return NextResponse.json(standardResponse(STATUS_CODE.OK, 'Get user success', payload), {
      status: STATUS_CODE.OK,
    })
  } catch (error) {
    return NextResponse.json(standardResponse(STATUS_CODE.UNAUTHORIZED, 'Unauthorized', null), {
      status: STATUS_CODE.UNAUTHORIZED,
    })
  }
}

export default getMe
