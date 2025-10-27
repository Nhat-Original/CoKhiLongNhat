'use client'
import { Button, ButtonGroup } from 'flowbite-react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { MdDesignServices, MdCategory, MdCircle } from 'react-icons/md'

const AdminTabBar = () => {
  const path = usePathname()
  const router = useRouter()

  const navigate = (path: string) => {
    router.push(path)
  }

  return (
    <ButtonGroup className="mt-4 mb-8">
      <Button
        color="gray"
        className={path === '/quan-ly/dich-vu' ? 'text-cyan-700' : ''}
        onClick={() => navigate('/quan-ly/dich-vu')}
      >
        <MdDesignServices className="mr-3 h-4 w-4" />
        Dịch vụ
      </Button>
      <Button
        color="gray"
        className={path.startsWith('/quan-ly/phan-loai') ? 'text-cyan-700' : ''}
        onClick={() => navigate('/quan-ly/phan-loai')}
      >
        <MdCategory className="mr-3 h-4 w-4" />
        Phân loại
      </Button>
      <Button
        color="gray"
        className={path.startsWith('/quan-ly/san-pham') ? 'text-cyan-700' : ''}
        onClick={() => navigate('/quan-ly/san-pham')}
      >
        <MdCircle className="mr-3 h-4 w-4" />
        Sản phẩm
      </Button>
    </ButtonGroup>
  )
}

export default AdminTabBar
