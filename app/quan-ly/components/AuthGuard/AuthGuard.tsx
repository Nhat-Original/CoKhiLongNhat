'use client'
import React from 'react'
import { ROLE } from '@prisma/client'
import NotFound from '@/app/not-found'
import useAuth from '@/hooks/useAuth'

const AuthGuard = () => {
  const { isAuth, user } = useAuth()

  if (!isAuth || user?.role !== ROLE.ADMIN) {
    return <NotFound />
  }

  return <></>
}

export default AuthGuard
