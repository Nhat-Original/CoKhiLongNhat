'use client'
import React from 'react'
import { Avatar, Dropdown, DropdownHeader, DropdownItem, Button, Spinner } from 'flowbite-react'
import { signIn, signOut, useSession } from 'next-auth/react'

const SigninButton = () => {
  const { data: session, status } = useSession()

  if (status === 'authenticated') {
    return (
      <Dropdown arrowIcon={false} inline label={<Avatar alt="User settings" img={session.user.image || ''} rounded />}>
        <DropdownHeader>
          <span className="block text-sm">{session.user.name}</span>
          <span className="block truncate text-sm font-medium">{session.user.email}</span>
        </DropdownHeader>
        <DropdownItem onClick={() => signOut()}>Đăng xuất</DropdownItem>
      </Dropdown>
    )
  }
  if (status === 'loading') {
    return (
      <Button color="gray">
        <Spinner aria-label="Alternate spinner button example" size="sm" />
      </Button>
    )
  }
  return (
    <Button color="gray" onClick={() => signIn()}>
      Đăng nhập
    </Button>
  )
}

export default SigninButton
