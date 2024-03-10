import MainFooter from '@/components/MainFooter'

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}

      <MainFooter />
    </>
  )
}

export default UserLayout
