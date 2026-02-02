'use client'
import React from 'react'
import { ENV } from '@/utils/constant'
import { Service, ServiceImage } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { Button, Carousel, Spinner } from 'flowbite-react'
import Link from 'next/link'
import servicePlaceholder from '@/public/images/servicePlaceholder.jpg'

const LIMIT = 4

const ServiceShowcase = () => {
  const query = useQuery({
    queryKey: ['service'],
    queryFn: async (): Promise<(Service & { serviceImages: ServiceImage[] })[]> => {
      const response = await fetch(`${ENV.NEXT_PUBLIC_API_URL}/service?limit=${LIMIT}&published=true`)
      return (await response.json()).data
    },
  })
  const serviceList = query.data || []

  return (
    <div>
      <div className="flex justify-between items-center mb-4 gap-4">
        <h1 className="text-3xl font-bold uppercase  ">dịch vụ</h1>
        <div className="h-1 bg-black grow rounded-full hidden sm:block"></div>
        <Link href="/dich-vu">
          <Button pill gradientDuoTone="purpleToBlue" size="lg" className="font-extrabold ">
            <div className="mr-2">Xem tất cả</div>
          </Button>
        </Link>
      </div>
      {query.isLoading ? (
        <div className="w-full text-center">
          <Spinner />
        </div>
      ) : serviceList.length === 0 ? (
        <div className="w-full text-center">Chưa có dịch vụ nào</div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 place-items-center">
          {serviceList.map((service) => (
            <div key={service.id} className="border rounded-xl flex gap-4 max-w-xl shadow-lg hover:opacity-95">
              <div className="flex items-center justify-center">
                <div className=" h-28 sm:h-56 aspect-square ">
                  <Carousel
                    indicators={false}
                    slideInterval={2000}
                    rightControl={<div className="hidden"></div>}
                    leftControl={<div className="hidden"></div>}
                  >
                    {!service.serviceImages || service.serviceImages.length === 0 ? (
                      <img className="w-full h-full object-cover" src={servicePlaceholder.src} alt="service image" />
                    ) : (
                      service.serviceImages.map((image) => (
                        <img
                          key={image.id}
                          className="w-full h-full object-cover"
                          src={image.url}
                          alt={service.simplifiedName}
                        />
                      ))
                    )}
                  </Carousel>
                </div>
              </div>
              <div className=" p-2 grow">
                <div className="text-md uppercase font-bold text">{service.name}</div>
                <div>{service.description || <span className="italic">Chưa có mô tả</span>}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Link href="/dich-vu" className={!serviceList || serviceList.length <= LIMIT ? 'hidden' : ''}>
        <div className="w-full mt-8 flex justify-center">
          <Button pill gradientDuoTone="purpleToBlue" size="lg" className="font-extrabold">
            Xem thêm dịch vụ
          </Button>
        </div>
      </Link>
    </div>
  )
}

export default ServiceShowcase
