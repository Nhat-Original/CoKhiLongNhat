'use client'
import React from 'react'
import Image from 'next/image'
import { signIn, signOut, useSession } from 'next-auth/react'

const SigninButton = () => {
  const { data: session, status } = useSession()

  if (status === 'authenticated') {
    return (
      <div className="flex items-center gap-4">
        <p className="hidden md:block">
          <span className="text-primary font-bold">{session.user.name}</span>
        </p>
        <Image
          src={session.user.image!}
          alt="user image"
          width={32}
          height={32}
          className="h-[32px] w-[32px] rounded-full hidden sm:block"
        ></Image>
        <button className="btn btn-ghost" onClick={() => signOut()}>
          <p className="font-bold">Đăng xuất</p>
        </button>
      </div>
    )
  } else if (status === 'loading') {
    return <span className="loading loading-bars loading-md"></span>
  }
  return (
    <button className="btn btn-ghost" onClick={() => signIn()}>
      <p className="font-bold">Đăng nhập</p>
    </button>
  )
}

export default SigninButton
