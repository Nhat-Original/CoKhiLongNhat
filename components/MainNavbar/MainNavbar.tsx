import React from 'react'
import { NavbarBrand, NavbarToggle, Navbar } from 'flowbite-react'
import NavbarLinks from './NavbarLinks'
import SigninButton from './SignInButton'
import Link from 'next/link'
import logo from '@/public/images/favicon.ico'

const MainNavbar = () => {
  return (
    <Navbar fluid rounded className="z-10 rounded-none">
      <NavbarBrand as={Link} prefetch={false} href="/" className="">
        <img alt="logo" src={logo.src} width={50} height={50} />
        <span className="self-center whitespace-nowrap hidden sm:block text-xl font-semibold dark:text-white">
          COKHILONGNHAT
        </span>
      </NavbarBrand>
      <NavbarLinks />
      <div className="flex items-center">
        <SigninButton />
        <NavbarToggle />
      </div>
    </Navbar>
  )
}

export default MainNavbar
