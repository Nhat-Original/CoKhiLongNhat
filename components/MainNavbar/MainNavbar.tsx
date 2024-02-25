import React from 'react'
import { NavbarBrand, NavbarToggle, Navbar } from 'flowbite-react'
import Image from 'next/image'
import NavbarLinks from './NavbarLinks'
import SigninButton from './SignInButton'
import Link from 'next/link'

const MainNavbar = () => {
  return (
    <Navbar fluid rounded>
      <NavbarBrand as={Link} prefetch={false} href="/">
        <Image alt="logo" src={'/favicon.ico'} width={50} height={50} />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">COKHICHITIET</span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <SigninButton />
        <NavbarToggle />
      </div>
      <NavbarLinks />
    </Navbar>
  )
}

export default MainNavbar
