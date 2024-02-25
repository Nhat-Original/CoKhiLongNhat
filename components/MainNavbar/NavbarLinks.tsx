'use client'
import React from 'react'
import { NavbarCollapse, NavbarLink } from 'flowbite-react'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { ROLE } from '@prisma/client'
import Link from 'next/link'

const NavbarLinks = () => {
  const path = usePathname()
  const { data: session } = useSession()

  return (
    <NavbarCollapse>
      <NavbarLink as={Link} prefetch={false} active={path === '/'} href="/">
        Trang chủ
      </NavbarLink>
      <NavbarLink as={Link} prefetch={false} active={path === '/san-pham'} href="/san-pham">
        Sản phẩm
      </NavbarLink>
      <NavbarLink as={Link} prefetch={false} active={path === '/lien-he'} href="/lien-he">
        Liên hệ
      </NavbarLink>
      <NavbarLink as={Link} prefetch={false} active={path === '/ho-tro'} href="/ho-tro">
        Hỗ trợ
      </NavbarLink>
      {session?.user.role === ROLE.ADMIN && (
        <NavbarLink as={Link} prefetch={false} active={path === '/quan-ly'} href="/quan-ly">
          Quản lý
        </NavbarLink>
      )}
    </NavbarCollapse>
  )
}

export default NavbarLinks
