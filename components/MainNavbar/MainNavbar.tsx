import React from 'react'
import { NavbarBrand, NavbarToggle, Navbar } from 'flowbite-react'
import Image from 'next/image'
import NavbarLinks from './NavbarLinks'
import SigninButton from './SignInButton'
import Link from 'next/link'

const MainNavbar = () => {
  return (
    <Navbar fluid rounded className="z-10 rounded-none">
      <NavbarBrand as={Link} prefetch={false} href="/">
        <Image alt="logo" src={'/images/favicon.ico'} width={50} height={50} />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">COKHILONGNHAT</span>
      </NavbarBrand>
      <NavbarLinks />
      <div className="flex">
        <SigninButton />
        <NavbarToggle />
      </div>
    </Navbar>
  )
}

export default MainNavbar
