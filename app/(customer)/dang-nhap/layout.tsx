import { Metadata } from 'next'

const metadata: Metadata = {
  title: 'Đăng nhập | Cơ Khí Long Nhật',
  robots: {
    index: false,
    follow: false,
  },
}

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export default LoginLayout
export { metadata }
