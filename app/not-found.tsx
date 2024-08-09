import { Button } from 'flowbite-react'
import { Metadata } from 'next'
import Link from 'next/link'

const metadata: Metadata = {
  title: 'Không tìm thấy trang này | Cơ Khí Long Nhật',
  description: 'Không tìm thấy trang này',
}

export default function NotFound() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 h-[calc(100vh-70px)]">
        <h2 className="text-5xl font-semibold">404</h2>
        <p>Không tìm thấy trang này</p>
        <Link href="/">
          <Button color="gray">Trở về trang chủ</Button>
        </Link>
      </div>
    </>
  )
}

export { metadata }
