import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, Bounce } from 'react-toastify'
import Providers from '@/components/Providers'
import MainNavbar from '@/components/MainNavbar'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="vn" data-theme="light">
      <head>
        <link rel="icon" href="/images/favicon.ico" />
        <title>Thiết kế và gia công chi tiết cơ khí chính xác | Cơ Khí Long Nhật</title>
        <meta name="description" content="" />
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
