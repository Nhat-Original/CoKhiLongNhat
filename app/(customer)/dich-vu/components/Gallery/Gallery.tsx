'use client'
import React from 'react'
import { ENV } from '@/utils/constant'
import { Product, ProductImage } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { Carousel, Spinner } from 'flowbite-react'
import servicePlaceholder from '@/public/images/servicePlaceholder.jpg'

const Gallery = () => {
  const query = useQuery({
    queryKey: ['service'],
    queryFn: async (): Promise<(Product & { serviceImages: ProductImage[] })[]> => {
      const response = await fetch(`${ENV.NEXT_PUBLIC_API_URL}/service?published=true`)
      return (await response.json()).data
    },
  })
  const serviceList = query.data || []

  return (
    <div>
      {query.isLoading ? (
        <div className="w-full text-center">
          <Spinner />
        </div>
      ) : serviceList.length === 0 ? (
        <div className="w-full text-center">Không tìm thấy dịch vụ </div>
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
    </div>
  )
}

export default Gallery
