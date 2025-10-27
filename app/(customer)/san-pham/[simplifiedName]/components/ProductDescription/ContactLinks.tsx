import React from 'react'
import { Button } from 'flowbite-react'
import { MdPhone, MdEmail } from 'react-icons/md'
import { SiZalo } from 'react-icons/si'
import CONTENT from '@/components/MainFooter/footerConstant'

const { CONTACT } = CONTENT

const ContactLinks = () => {
  return (
    <div className="flex flex-col gap-2 bg-gray-800 rounded-lg p-2">
      <p className="font-bold text-3xl text-white">Liên hệ ngay:</p>
      <Button color="info" size="sm" className="max-w-sm">
        <a className="flex items-center " href={`tel:${CONTACT.PHONE}`} target="_blank">
          <MdPhone className="mr-3 h-4 w-4" />
          {CONTACT.PHONE}
        </a>
      </Button>
      <Button color="info" size="sm" className="max-w-sm">
        <a
          className="flex items-center"
          href={`mailto:${CONTACT.EMAIL}?subject=Liên hệ từ website Cơ Khí Long Nhật`}
          target="_blank"
        >
          <MdEmail className="mr-3 h-4 w-4" />
          {CONTACT.EMAIL}
        </a>
      </Button>
      <Button color="info" size="sm" className="max-w-sm">
        <a className="flex items-center " href={`https://${CONTACT.ZALO}`} target="_blank">
          <SiZalo className="mr-3 h-4 w-4" />
          {CONTACT.ZALO}
        </a>
      </Button>
    </div>
  )
}

export default ContactLinks
