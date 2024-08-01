'use client'
import AdminTabBar from './components/AdminTabBar'
import { ROLE } from '@prisma/client'
import NotFound from '../not-found'
import useAuth from '@/hooks/useAuth'
import Head from 'next/head'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuth, user } = useAuth()

  if (!isAuth || user?.role !== ROLE.ADMIN) {
    return <NotFound />
  }

  return (
    <>
      <Head>
        <title>Quản lý | Cơ Khí Long Nhật</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>

      <AdminTabBar />

      {children}
    </>
  )
}

export default AdminLayout
