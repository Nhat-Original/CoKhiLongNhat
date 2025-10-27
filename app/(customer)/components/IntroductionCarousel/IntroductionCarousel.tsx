import React from 'react'
import { Button, Carousel } from 'flowbite-react'
import Link from 'next/link'

const images = [
  'https://res.cloudinary.com/dsoy3jopz/image/upload/v1722522536/a1tzgqc3p3hakdoexlcp.jpg',
  'https://res.cloudinary.com/dsoy3jopz/image/upload/v1722778318/sqbhkdcyneckh9nn39la.jpg',
]

const IntroductionCarousel = () => {
  return (
    <div className="h-80">
      <Carousel slideInterval={3000} pauseOnHover indicators={true}>
        <div className="w-full h-full">
          <img className="w-full h-full object-cover opacity-90" alt="introduction" src={images[0]} />
          <div className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
            <h1 className="text-white text-2xl sm:text-4xl font-extrabold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              COKHILONGNHAT
            </h1>
            <p className="text-white text-lg font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              Chuyên bán các loại chi tiết cơ khí với độ chính xác cao
            </p>
          </div>
        </div>
        <div className="w-full h-full opacity-90">
          <img className="w-full h-full object-cover" alt="introduction" src={images[1]} />
          <div className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
            <h1 className="text-white text-2xl sm:text-4xl font-extrabold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              COKHILONGNHAT
            </h1>
            <div className="flex flex-col items-center gap-2">
              <Link href="/san-pham">
                <Button gradientDuoTone="purpleToBlue" size="lg" className="font-extrabold text-xl">
                  Xem sản phẩm
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  )
}

export default IntroductionCarousel
