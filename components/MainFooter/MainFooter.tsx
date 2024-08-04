import { Footer, FooterBrand, FooterLink, FooterLinkGroup, FooterTitle } from 'flowbite-react'
import FOOTER from './footerConstant'
import logo from '@/public/images/favicon.ico'

const { INFORMATION, CONTACT } = FOOTER

const MainFooter = () => {
  return (
    <Footer className="bg-gray-900">
      <div className="w-full">
        <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
          <div>
            <FooterBrand src={logo.src} alt="logo" className="aspect-square w-1/4 h-auto" />
          </div>
          <div>
            <FooterTitle title="Thông tin" className="font-bold underline" />
            <FooterLinkGroup col>
              <div>
                <b>Mã số thuế (MST):</b> {INFORMATION.TAX_CODE}
              </div>
              <div>
                <b>Giám đốc:</b> {INFORMATION.PRESIDENT}
              </div>
              <div>
                <b>Địa chỉ:</b> {INFORMATION.ADDRESS}
              </div>
            </FooterLinkGroup>
          </div>
          <div>
            <FooterTitle title="Liên hệ" className="font-bold underline" />
            <FooterLinkGroup col>
              <FooterLink href={`tel:${CONTACT.PHONE}`} target="_blank" className="flex">
                <b>Số điện thoại:</b> {CONTACT.PHONE}
              </FooterLink>
              <FooterLink
                href={`
                  mailto:${CONTACT.EMAIL}?subject=Liên hệ từ website&body=Chào bạn,
                `}
                target="_blank"
                className="flex"
              >
                <b>Email:</b> {CONTACT.EMAIL}
              </FooterLink>
              <FooterLink href={`https://${CONTACT.ZALO}`} target="_blank" className="flex">
                <b>Zalo:</b> {CONTACT.ZALO}
              </FooterLink>
              <FooterLink href={`https://${CONTACT.FACEBOOK}`} target="_blank" className="flex">
                <b>Facebook:</b> {CONTACT.FACEBOOK}
              </FooterLink>
            </FooterLinkGroup>
          </div>
          <div>
            <FooterTitle title="Hỗ trợ" className="font-bold underline" />
            <FooterLinkGroup col>
              <FooterLink href="">
                <b>Hướng dẫn mua hàng</b>
              </FooterLink>
              <FooterLink href="">
                <b>Chính sách giao hàng</b>
              </FooterLink>
            </FooterLinkGroup>
          </div>
        </div>
        <div className="w-full text-white bg-gray-800 px-4 py-6 sm:flex sm:items-center sm:justify-between">
          cokhilongnhat.vercel.app
        </div>
        <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center"></div>
      </div>
    </Footer>
  )
}

export default MainFooter
