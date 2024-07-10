import React from 'react'
import { Button, Carousel } from 'flowbite-react'
import showcaseImage1 from './assets/showcaseImage1.jpg'
import showcaseImage2 from './assets/showcaseImage2.jpg'
import Link from 'next/link'

const IntroductionCarousel = () => {
  return (
    <div className="h-80">
      <Carousel slideInterval={3000} pauseOnHover indicators={true}>
        <div className="w-full h-full">
          <img className=" w-full h-full object-cover opacity-90" alt="introduction" src={showcaseImage1.src} />
          <div className="text-white text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
            <h1 className="text-4xl font-extrabold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">CoKhiChiTiet</h1>
            <p className="text-lg font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              Chuyên bán các loại chi tiết cơ khí nhỏ với độ chính xác cao
            </p>
          </div>
        </div>
        <div className=" w-full h-full opacity-90">
          <img className=" w-full h-full object-cover" alt="introduction" src={showcaseImage2.src} />
          <div className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
            <h1 className="text-4xl font-extrabold">CoKhiChiTiet</h1>
            <Link href="/san-pham">
              <Button pill gradientDuoTone="purpleToBlue" size="lg" className="font-extrabold">
                XEM SẢN PHẨM
              </Button>
            </Link>
          </div>
        </div>
      </Carousel>
    </div>
  )
}

export default IntroductionCarousel
