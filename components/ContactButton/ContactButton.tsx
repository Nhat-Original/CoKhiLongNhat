import React from 'react'
import { Dropdown, DropdownItem } from 'flowbite-react'
import { MdChat } from 'react-icons/md'
import { MdPhone, MdEmail } from 'react-icons/md'
import { SiZalo } from 'react-icons/si'
import CONTENT from '@/components/MainFooter/footerConstant'

const { CONTACT } = CONTENT

const ContactButton = () => {
  return (
    <div className="p-0 z-10 fixed right-8 bottom-16 rounded-lg ">
      <span className="absolute top-[7px] left-[11px] bg-pink-500 w-2/3 h-2/3 -z-10 rounded-md animate-ping" />
      <Dropdown gradientDuoTone="purpleToPink" label={<MdChat size={'30px'} />} placement="left" arrowIcon={false}>
        <DropdownItem className="">
          <a href={`tel:${CONTACT.PHONE}`} target="_blank">
            <MdPhone className="mr-3 h-4 w-4" />
            {CONTACT.PHONE}
          </a>
        </DropdownItem>
        <DropdownItem>
          <a href={`mailto:${CONTACT.EMAIL}?subject=Liên hệ từ website Cơ Khí Long Nhật`} target="_blank">
            <MdEmail className="mr-3 h-4 w-4" />
            {CONTACT.EMAIL}
          </a>
        </DropdownItem>
        <DropdownItem>
          <a href={`https://${CONTACT.ZALO}`} target="_blank">
            <SiZalo className="mr-3 h-4 w-4" />
            {CONTACT.ZALO}
          </a>
        </DropdownItem>
      </Dropdown>
    </div>
  )
}

export default ContactButton
