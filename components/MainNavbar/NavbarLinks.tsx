'use client'
import React from 'react'
import { NavbarCollapse, NavbarLink } from 'flowbite-react'
import { usePathname } from 'next/navigation'
import { ROLE } from '@prisma/client'
import Link from 'next/link'
import useAuth from '@/hooks/useAuth'

const NavbarLinks = () => {
  const path = usePathname()
  const { isAuth, user } = useAuth()

  return (
    <NavbarCollapse>
      <NavbarLink as={Link} prefetch={false} active={path === '/'} href="/">
        Trang chủ
      </NavbarLink>
      <NavbarLink as={Link} prefetch={false} active={path.startsWith('/san-pham')} href="/san-pham">
        Sản phẩm
      </NavbarLink>
      {/* <NavbarLink as={Link} prefetch={false} active={path.startsWith('/yeu-thich')} href="/yeu-thich">
        Yêu thích
      </NavbarLink> */}
      {/* <NavbarLink as={Link} prefetch={false} active={path.startsWith('/lien-he')} href="/lien-he">
        Liên hệ
      </NavbarLink> */}
      {/* <NavbarLink as={Link} prefetch={false} active={path.startsWith('/ho-tro')} href="/ho-tro">
        Hỗ trợ
      </NavbarLink> */}
      {isAuth && user?.role === ROLE.ADMIN && (
        <NavbarLink as={Link} prefetch={false} active={path.startsWith('/quan-ly')} href="/quan-ly">
          Quản lý
        </NavbarLink>
      )}
    </NavbarCollapse>
  )
}

export default NavbarLinks
