'use client'
import React, { useState } from 'react'
import { Button, Label, TextInput } from 'flowbite-react'
import { FcGoogle } from 'react-icons/fc'
import { signIn } from 'next-auth/react'
import { useMutation } from '@tanstack/react-query'
import { ENV } from '@/utils/constant'
import { toast } from 'react-toastify'
import { queryClient } from '@/components/Providers/QueryProvider'

type FormData = { email: string; password: string }

const LoginForm = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  })

  const login = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch(`${ENV.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(formData),
      })
      return await response.json()
    },
    onSuccess: (res) => {
      if (!res.data) {
        toast.error(res.message)
        return
      }
      toast.success('Đăng nhập thàng công')
      queryClient.invalidateQueries({ queryKey: ['me'] })
    },
    onError: () => {
      toast.error('Đăng nhập thất bại')
    },
  })

  return (
    <div className=" max-w-md w-full flex flex-col gap-4 ">
      <h1 className="font-bold text-3xl text-center">Đăng nhập</h1>
      <form
        className="flex max-w-md flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault()
          login.mutate(formData)
          setFormData({ email: '', password: '' })
        }}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email">Email</Label>
          </div>
          <TextInput
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value })
            }}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password">Mật khẩu</Label>
          </div>
          <TextInput
            id="password"
            type="password"
            required
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value })
            }}
          />
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
