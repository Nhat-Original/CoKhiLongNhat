import MainFooter from '@/components/MainFooter'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}

      <MainFooter />
    </>
  )
}

export default RootLayout
