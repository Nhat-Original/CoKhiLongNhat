'use client'
import { useSession } from 'next-auth/react'
import AdminTabBar from './components/AdminTabBar'
import { ROLE } from '@prisma/client'
import NotFound from '../not-found'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession()

  if (session?.user.role !== ROLE.ADMIN) {
    return <NotFound />
  }

  return (
    <>
      <AdminTabBar />

      {children}
    </>
  )
}

export default AdminLayout
