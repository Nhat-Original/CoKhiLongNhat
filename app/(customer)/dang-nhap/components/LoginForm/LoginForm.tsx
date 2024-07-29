'use client'
import React from 'react'
import { Button, Label, TextInput } from 'flowbite-react'
import { FcGoogle } from 'react-icons/fc'
import { signIn } from 'next-auth/react'

const LoginForm = () => {
  return (
    <div className=" max-w-md w-full flex flex-col gap-4 ">
      <h1 className="font-bold text-3xl text-center">Đăng nhập</h1>
      <form className="flex max-w-md flex-col gap-4" onSubmit={() => {}}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email">Email</Label>
          </div>
          <TextInput id="email" type="email" required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password">Mật khẩu</Label>
          </div>
          <TextInput id="password" type="password" required />
        </div>
        <Button type="submit">Đăng nhập</Button>
      </form>

      <Button color="white" className="border" onClick={() => signIn()}>
        <div className="mr-2">
          <FcGoogle />
        </div>
        <div>Đăng nhập bằng Google</div>
      </Button>
    </div>
  )
}

export default LoginForm
