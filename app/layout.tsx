import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import type { Metadata } from 'next'
import { ToastContainer, Bounce } from 'react-toastify'
import Providers from '@/components/Providers'
import MainNavbar from '@/components/MainNavbar'

const metadata: Metadata = {
  title: 'CoKhiChiTiet',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link rel="icon" href="/images/favicon.ico" />
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
export { metadata }
