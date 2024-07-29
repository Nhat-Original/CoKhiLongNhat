import { Footer, FooterBrand, FooterIcon, FooterLink, FooterLinkGroup, FooterTitle } from 'flowbite-react'
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs'
import FOOTER from './footerConstant'

const { INFORMATION, CONTACT, SUPPORT } = FOOTER

const MainFooter = () => {
  return (
    <Footer bgDark>
      <div className="w-full">
        <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
          <div>
            <FooterBrand src="/images/favicon.ico" alt="logo" className="scale-150" />
          </div>
          <div>
            <FooterTitle title="Thông tin" className="font-bold underline" />
            <FooterLinkGroup col>
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
              <div>
                <b>Số điện thoại:</b> {CONTACT.PHONE}
              </div>
              <FooterLink href="#" className="flex">
                <b>Facebook:</b> {CONTACT.FACEBOOK}
              </FooterLink>
              <FooterLink href="#" className="flex">
                <b>Zalo:</b> {CONTACT.ZALO}
              </FooterLink>
              <FooterLink href="#" className="flex">
                <b>Email:</b>
              </FooterLink>
            </FooterLinkGroup>
          </div>
          <div>
            <FooterTitle title="Hỗ trợ" className="font-bold underline" />
            <FooterLinkGroup col>
              <FooterLink href="#">
                <b>{SUPPORT.GUIDE}</b>
              </FooterLink>
              <FooterLink href="#">
                <b>{SUPPORT.DELIVERY}</b>
              </FooterLink>
            </FooterLinkGroup>
          </div>
        </div>
        <div className="w-full bg-gray-700 px-4 py-6 sm:flex sm:items-center sm:justify-between">
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FooterIcon href="#" icon={BsFacebook} />
            <FooterIcon href="#" icon={BsInstagram} />
            <FooterIcon href="#" icon={BsTwitter} />
            <FooterIcon href="#" icon={BsGithub} />
            <FooterIcon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  )
}

export default MainFooter
