import { Footer, FooterBrand, FooterLinkGroup, FooterTitle } from 'flowbite-react'
import FOOTER from './footerConstant'
import logo from '@/public/images/favicon.ico'
import { MdPhone, MdEmail } from 'react-icons/md'
import { SiZalo } from 'react-icons/si'

const { INFORMATION, CONTACT } = FOOTER

const MainFooter = () => {
  return (
    <Footer className="bg-gray-900">
      <div className="w-full">
        <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
          <div>
            <FooterBrand
              src={logo.src}
              alt="logo"
              className="bg-white rounded-full aspect-square w-1/2 sm:w-1/4 h-auto"
            />
          </div>
          <div>
            <FooterTitle title="Thông tin" className="font-bold underline" />
            <FooterLinkGroup col>
              <div>
                <b>Mã số thuế:</b> {INFORMATION.TAX_CODE}
              </div>
              <div>
                <b>Địa chỉ:</b> {INFORMATION.ADDRESS}
              </div>
            </FooterLinkGroup>
          </div>
          <div>
            <FooterTitle title="Liên hệ" className="font-bold underline" />
            <FooterLinkGroup col className="truncate">
              <a href={`tel:${CONTACT.PHONE}`} target="_blank">
                <div className="flex items-center gap-1">
                  <MdPhone />
                  {CONTACT.PHONE}
                </div>
              </a>
              <a href={`mailto:${CONTACT.EMAIL}?subject=Liên hệ từ website Cơ Khí Long Nhật`} target="_blank">
                <div className="flex items-center gap-1">
                  <MdEmail />
                  {CONTACT.EMAIL}
                </div>
              </a>
              <a href={`https://${CONTACT.ZALO}`} target="_blank">
                <div className="flex items-center gap-1">
                  <SiZalo />
                  {CONTACT.ZALO}
                </div>
              </a>
              {/* <a href={`https://${CONTACT.FACEBOOK}`} target="_blank">
                <div className="flex items-center gap-1">
                  <MdFacebook />
                  {CONTACT.FACEBOOK}
                </div>
              </a> */}
            </FooterLinkGroup>
          </div>
          <div>
            <FooterTitle title="Hỗ trợ" className="font-bold underline" />
            <FooterLinkGroup col>
              <a href="">
                <b>Hướng dẫn mua hàng</b>
              </a>
              <a href="">
                <b>Chính sách giao hàng</b>
              </a>
            </FooterLinkGroup>
          </div>
        </div>
        <div className="w-full text-white bg-gray-800 px-4 py-6">cokhilongnhat.vercel.app</div>
      </div>
    </Footer>
  )
}

export default MainFooter
