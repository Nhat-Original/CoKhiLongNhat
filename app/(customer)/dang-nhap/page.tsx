'use client'
import React, { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import Head from 'next/head'

const LoginPage = () => {
  const router = useRouter()
  const { isAuth } = useAuth()

  useEffect(() => {
    if (typeof window !== 'undefined' && isAuth) {
      router.push('/')
    }
  }, [isAuth, router])

  return (
    <>
      <Head>
        <title>Đăng nhập | Cơ Khí Long Nhật</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <div className="flex flex-col justify-center items-center page">
        <LoginForm />
      </div>
    </>
  )
}

export default LoginPage
