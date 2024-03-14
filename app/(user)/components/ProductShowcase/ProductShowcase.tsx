'use client'
import React from 'react'
import { ENV } from '@/utils/constant'
import { Product, ProductImage } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { Button, Card, Spinner } from 'flowbite-react'
import Link from 'next/link'

const ProductShowcase = () => {
  const query = useQuery({
    queryKey: ['product'],
    queryFn: async (): Promise<(Product & { productImages: ProductImage[] })[]> => {
      const response = await fetch(`${ENV.API_URL}/product?limit=6&is-published=true`)
      return (await response.json()).data
    },
  })
  const categoryList = query.data || []

  return (
    <div>
      <h1 className="text-center text-4xl font-bold mb-4">Một số sản phẩm</h1>

      {query.isLoading ? (
        <div className="w-full text-center">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categoryList.map((product) => (
            <div key={product.id} className="w-full h-full">
              <Link href={`/san-pham/${product.simplifiedName}`}>
                <Card
                  className="max-w-sm mx-auto hover:scale-[1.01] cursor-pointer"
                  imgAlt={product.simplifiedName}
                  imgSrc={product.productImages[0].url}
                >
                  <div className="text-sm text-gray-500">{product.name}</div>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      )}

      <Link href="/san-pham">
        <div className="w-full mt-8 flex justify-center">
          <Button size="lg" className="font-extrabold mx-auto">
            XEM THÊM SẢN PHẨM
          </Button>
        </div>
      </Link>
    </div>
  )
}

export default ProductShowcase
