'use client'
import React, { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
  const router = useRouter()
  const { isAuth } = useAuth()

  useEffect(() => {
    if (typeof window !== 'undefined' && isAuth) {
      router.push('/')
    }
  }, [isAuth, router])

  return (
    <div className="flex flex-col justify-center items-center page">
      <LoginForm />
    </div>
  )
}

export default LoginPage
