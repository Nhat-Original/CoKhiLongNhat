import { Metadata } from 'next'
import React from 'react'

const metadata: Metadata = {
  title: 'Quản lý | Cơ Khí Long Nhật',
  description: 'Trang quản lý của Cơ Khí Long Nhật',
  robots: {
    index: false,
    follow: false,
  },
}

const AdminMetadataLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export default AdminMetadataLayout
export { metadata }
