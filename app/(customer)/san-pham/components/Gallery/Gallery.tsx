'use client'
import React, { useEffect } from 'react'
import { ENV } from '@/utils/constant'
import { Product, ProductImage } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { Card, Spinner } from 'flowbite-react'
import Link from 'next/link'
import productPlaceholder from '@/public/images/productPlaceholder.png'
import useProductStore from '../../stores/useProductStore'
import { useShallow } from 'zustand/react/shallow'

const Gallery = () => {
  const [productNameSearch, productCategorySearch, setProductCount] = useProductStore(
    useShallow((state) => [state.productNameSearch, state.productCategorySearch, state.setProductCount]),
  )

  const query = useQuery({
    queryKey: ['product', productNameSearch, productCategorySearch],
    queryFn: async (): Promise<(Product & { productImages: ProductImage[] })[]> => {
      const response = await fetch(
        `${ENV.API_URL}/product?published=true&name=${productNameSearch}&category=${productCategorySearch}`,
      )
      return (await response.json()).data
    },
  })
  const productList = query.data || []

  useEffect(() => {
    if (query.isSuccess) {
      setProductCount(productList.length)
    }
  }, [query.isSuccess, productList.length, setProductCount])

  return (
    <div>
      {query.isLoading ? (
        <div className="w-full text-center">
          <Spinner />
        </div>
      ) : productList.length === 0 ? (
        <div className="w-full text-center">Không tìm thấy sản phẩm </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                    <div className="text-sm text-gray-500">{product.name}</div>
                  </Card>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Gallery
