import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, Bounce } from 'react-toastify'
import Providers from '@/components/Providers'
import MainNavbar from '@/components/MainNavbar'
import logo from '@/public/images/favicon.ico'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="vn" data-theme="light">
      <head>
        <link rel="icon" href="/images/favicon.ico" />
        <title>Thiết kế và gia công chi tiết cơ khí chính xác | Cơ Khí Long Nhật</title>
        <meta
          name="description"
          content="Chuyên thiết kế và gia công chi tiết cơ khí với độ chính xác cao. Cam kết đáp ứng các yêu cầu kỹ thuật. Liên hệ ngay để nhận tư vấn miễn phí."
        />

        <meta name="og:locale" content="vi" />
        <meta name="og:type" content="website" />
        <meta name="og:url" content="https://cokhilongnhat.vercel.app" />
        <meta name="og:title" content="Cơ Khí Long Nhật - Thiết kế và gia công chi tiết cơ khí chính xác" />
        <meta
          name="og:description"
          content="Chuyên thiết kế và gia công chi tiết cơ khí với độ chính xác cao. Cam kết đáp ứng các yêu cầu kỹ thuật. Liên hệ ngay để nhận tư vấn miễn phí."
        />
        <meta name="og:site_name" content="Cơ Khí Long Nhật" />
        <meta name="og:image" content={logo.src} />
      </head>
      <body>
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
