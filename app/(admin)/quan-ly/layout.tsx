'use client'
import AdminTabBar from './components/AdminTabBar'
import { ROLE } from '@prisma/client'
import NotFound from '@/app/not-found'
import useAuth from '@/hooks/useAuth'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuth, user } = useAuth()

  if (!isAuth || user?.role !== ROLE.ADMIN) {
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
