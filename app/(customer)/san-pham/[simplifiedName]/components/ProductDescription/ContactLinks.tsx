import React from 'react'
import { Button, ButtonGroup } from 'flowbite-react'
import { MdPhone, MdEmail } from 'react-icons/md'
import { SiZalo } from 'react-icons/si'
import CONTENT from '@/components/MainFooter/footerConstant'

const { CONTACT } = CONTENT

const ContactLinks = () => {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-bold text-3xl text-cyan-600">Liên hệ ngay:</p>
      <ButtonGroup className="flex sm:inline flex-col gap-2 sm:gap-0">
        <a href={`tel:${CONTACT.PHONE}`} target="_blank">
          <Button color="info" className="rounded sm:rounded-l-lg sm:rounded-r-none w-full sm:w-auto">
            <MdPhone className="mr-3 h-4 w-4" />
            {CONTACT.PHONE}
          </Button>
        </a>
        <a href={`mailto:${CONTACT.EMAIL}?subject=Liên hệ từ website Cơ Khí Long Nhật`} target="_blank">
          <Button color="info" className="rounded sm:rounded-none w-full sm:w-auto">
            <MdEmail className="mr-3 h-4 w-4" />
            {CONTACT.EMAIL}
          </Button>
        </a>
        <a href={`https://${CONTACT.ZALO}`} target="_blank">
          <Button color="info" className="rounded sm:rounded-r-lg sm:rounded-l-none w-full sm:w-auto">
            <SiZalo className="mr-3 h-4 w-4" />
            {CONTACT.ZALO}
          </Button>
        </a>
      </ButtonGroup>
    </div>
  )
}

export default ContactLinks
