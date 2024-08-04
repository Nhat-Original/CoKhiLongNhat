'use client'
import React from 'react'
import { ENV } from '@/utils/constant'
import { Product, ProductImage } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { Button, Card, Spinner } from 'flowbite-react'
import Link from 'next/link'
import productPlaceholder from '@/public/images/productPlaceholder.png'
import { MdArrowForward } from 'react-icons/md'

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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold uppercase">sản phẩm</h1>
        <Link href="/san-pham">
          <Button pill gradientDuoTone="purpleToBlue" size="lg" className="font-extrabold ">
            <div className="mr-2">Xem tất cả</div>
            <div>
              <MdArrowForward />
            </div>
          </Button>
        </Link>
      </div>
      {query.isLoading ? (
        <div className="w-full text-center">
          <Spinner />
        </div>
      ) : productList.length === 0 ? (
        <div className="w-full text-center">Chưa có sản phẩm nào</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {productList.map((product) => (
            <div key={product.id}>
              <div className="max-w-[24rem] mx-auto">
                <Link href={`/san-pham/${product.simplifiedName}`}>
                  <Card
                    className="max-w-sm cursor-pointer hover:opacity-95 hover:scale-[1.01]"
                    renderImage={() => (
                      <img
                        className="w-full aspect-square object-cover rounded-t-md"
                        src={product.productImages[0]?.url || productPlaceholder.src}
                        alt={product.simplifiedName}
                      />
                    )}
                  >
                    <div className="flex flex-col gap-1">
                      <div className="text-md uppercase font-bold">{product.name}</div>
                      <div className="text-md font-bold text-cyan-700">
                        {(() => {
                          if (!product.price) return 'Liên hệ'
                          else if (product.price && product.quantity && product.unit)
                            return `${product.price.toLocaleString()}đ / ${product.quantity} ${product.unit}`
                          else return `${product.price.toLocaleString()}đ`
                        })()}
                      </div>
                      <div>{product.description || <span className="italic">Chưa có mô tả</span>}</div>
                    </div>
                  </Card>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <Link href="/san-pham">
        <div className="w-full mt-8 flex justify-center">
          <Button pill gradientDuoTone="purpleToBlue" size="lg" className="font-extrabold">
            Xem thêm sản phẩm
          </Button>
        </div>
      </Link>
    </div>
  )
}

export default ProductShowcase
