import { STATUS_CODE, ENV } from '@/utils/constant'
import standardResponse from '@/utils/standardResponese'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma'

const PING_DATABASE_HEADER = 'x-vercel-cron-secret'

const pingDatabase = async (request: NextRequest) => {
  const cronSecret = request.headers.get(PING_DATABASE_HEADER)

  if (cronSecret !== ENV.CRON_SECRET) {
    return NextResponse.json(standardResponse(STATUS_CODE.UNAUTHORIZED, 'Unauthorized', null), {
      status: STATUS_CODE.UNAUTHORIZED,
    })
  }

  try {
    await prisma.$queryRaw`SELECT 1`
    return NextResponse.json(standardResponse(STATUS_CODE.OK, 'Database pinged successfully', null), {
      status: STATUS_CODE.OK,
    })
  } catch (error) {
    console.error('Ping failed:', error)
    return NextResponse.json(standardResponse(STATUS_CODE.INTERNAL_SERVER_ERROR, 'Internal Server Error', null), {
      status: STATUS_CODE.INTERNAL_SERVER_ERROR,
    })
  }
}

export default pingDatabase
