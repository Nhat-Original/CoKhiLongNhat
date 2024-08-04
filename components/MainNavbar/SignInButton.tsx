'use client'
import React from 'react'
import { Avatar, Dropdown, DropdownHeader, DropdownItem, Button, Spinner } from 'flowbite-react'
import { signOut } from 'next-auth/react'
import avatarPlaceholder from '../../public/images/avatarPlaceholder.png'
import Link from 'next/link'
import useAuth from '@/hooks/useAuth'
import { queryClient } from '../Providers/QueryProvider'
import Cookies from 'universal-cookie'

const SigninButton = () => {
  const cookies = new Cookies()
  const { isAuth, user, sessionStatus } = useAuth()

  if (isAuth) {
    return (
      <Dropdown
        label={<Avatar alt="user avatar" img={user?.image || avatarPlaceholder.src} rounded />}
        arrowIcon={false}
        inline
      >
        <DropdownHeader>
          <span className="block text-sm">{user?.name || ''}</span>
          <span className="block truncate text-sm font-medium">{user?.email}</span>
        </DropdownHeader>
        <DropdownItem
          onClick={() => {
            signOut()
            cookies.remove('token')
            queryClient.invalidateQueries({
              queryKey: ['me'],
            })
          }}
        >
          Đăng xuất
        </DropdownItem>
      </Dropdown>
    )
  }
  if (sessionStatus === 'loading') {
    return (
      <Button color="gray">
        <Spinner size="sm" />
      </Button>
    )
  }
  return (
    <Link href="/dang-nhap">
      <Button color="gray">
        <p className="font-bold">Đăng nhập</p>
      </Button>
    </Link>
  )
}

export default SigninButton
