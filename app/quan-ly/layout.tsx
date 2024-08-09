import AdminTabBar from './components/AdminTabBar'
import AuthGuard from './components/AuthGuard'
import { Metadata } from 'next'

const metadata: Metadata = {
  title: 'Quản lý | Cơ Khí Long Nhật',
  description: 'Trang quản lý của Cơ Khí Long Nhật',
  robots: {
    index: false,
    follow: false,
  },
}

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthGuard />

      <AdminTabBar />

      {children}
    </>
  )
}

export default AdminLayout
export { metadata }
