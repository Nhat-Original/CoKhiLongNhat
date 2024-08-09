import ContactButton from '@/components/ContactButton'
import MainFooter from '@/components/MainFooter'

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}

      <ContactButton />

      <MainFooter />
    </>
  )
}

export default UserLayout
