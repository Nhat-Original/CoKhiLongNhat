import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, Bounce } from 'react-toastify'
import Providers from '@/components/Providers'
import MainNavbar from '@/components/MainNavbar'
import logo from '@/public/images/favicon.ico'
import { Metadata } from 'next'

const generateMetadata = (): Metadata => {
  return {
    metadataBase: new URL('https://cokhilongnhat.vercel.app'),
    icons: {
      icon: logo.src,
    },
    title: 'Cơ Khí Long Nhật - Thiết kế và gia công chi tiết cơ khí | Cơ Khí Long Nhật',
    description:
      'Chuyên thiết kế và gia công chi tiết cơ khí với độ chính xác cao. Cam kết đáp ứng các yêu cầu kỹ thuật. Liên hệ ngay để nhận tư vấn miễn phí.',
    openGraph: {
      locale: 'vi',
      type: 'website',
      url: 'https://cokhilongnhat.vercel.app',
      title: 'Cơ Khí Long Nhật - Thiết kế và gia công chi tiết cơ khí chính xác',
      description:
        'Chuyên thiết kế và gia công chi tiết cơ khí với độ chính xác cao. Cam kết đáp ứng các yêu cầu kỹ thuật. Liên hệ ngay để nhận tư vấn miễn phí.',
      siteName: 'Cơ Khí Long Nhật',
      images: {
        url: logo.src,
      },
    },
  }
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="vn" data-theme="light">
      <body className="relative">
        <Providers>
          <MainNavbar />

          {children}

          <ToastContainer
            position="bottom-right"
            limit={3}
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
            theme="colored"
            transition={Bounce}
          />
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
export { generateMetadata }
