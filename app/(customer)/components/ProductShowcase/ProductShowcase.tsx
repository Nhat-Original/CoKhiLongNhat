'use client'
import React from 'react'
import { ENV } from '@/utils/constant'
import { Product, ProductImage } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { Button, Card, Spinner } from 'flowbite-react'
import Link from 'next/link'
import productPlaceholder from '@/public/images/productPlaceholder.png'

const ProductShowcase = () => {
  const query = useQuery({
    queryKey: ['product'],
    queryFn: async (): Promise<(Product & { productImages: ProductImage[] })[]> => {
      const response = await fetch(`${ENV.API_URL}/product?limit=6&published=true`)
      return (await response.json()).data
    },
  })
  const productList = query.data || []

  return (
    <div>
      <h1 className="text-center text-4xl font-bold mb-4">Một số sản phẩm</h1>

      {query.isLoading ? (
        <div className="w-full text-center">
          <Spinner />
        </div>
      ) : productList.length === 0 ? (
        <div className="w-full text-center">Chưa có sản phẩm nào</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {productList.map((product) => (
            <div key={product.id}>
              <div className="max-w-[24rem] mx-auto">
                <Link href={`/san-pham/${product.simplifiedName}`}>
                  <Card
                    className="max-w-sm hover:scale-[1.01] hover:opacity-95 cursor-pointer"
                    renderImage={() => (
                      <img
                        className="w-full aspect-square object-cover rounded-t-md"
                        src={product.productImages[0]?.url || productPlaceholder.src}
                        alt={product.simplifiedName}
                      />
                    )}
                  >
                    <div className="text-sm text-gray-500">{product.name}</div>
                  </Card>
                </Link>
              </div>
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
