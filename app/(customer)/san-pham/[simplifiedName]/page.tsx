'use client'
import React from 'react'
import ProductShowcase from './components/ProductShowcase'
import ProductPreview from './components/ProductPreview'
import ProductDescription from './components/ProductDescription'
import { useQuery } from '@tanstack/react-query'
import useProductDetailStore from './stores/useProductDetailStore'
import { ENV } from '@/utils/constant'
import { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { Button, Spinner } from 'flowbite-react'
import Link from 'next/link'

const ProductDetailPage = ({ params }: { params: { simplifiedName: string } }) => {
  const [setProduct, setProductImages, setIsPreviewing, setIsFavorite] = useProductDetailStore(
    useShallow((state) => [
      state.setProduct,
      state.setProductImages,
      state.setIsPreviewing,
      state.setIsFavorite,
      state.product,
    ]),
  )

  const query = useQuery({
    queryKey: ['product', params.simplifiedName],
    queryFn: async (): Promise<any> => {
      const response = await fetch(`${ENV.NEXT_PUBLIC_API_URL}/product/simplified-name/${params.simplifiedName}`)
      if (!response.ok) throw new Error()
      return (await response.json()).data
    },
  })

  useEffect(() => {
    if (query.isSuccess) {
      setProduct(query.data)
      setProductImages(query.data.productImages || [])
      setIsPreviewing(false)
      setIsFavorite((JSON.parse(localStorage.getItem('isFavorite') || '[]') as string[]).includes(query.data.id))
    }
  }, [query.isSuccess, query.data, setProduct, setProductImages, setIsPreviewing, setIsFavorite])

  if (query.isLoading)
    return (
      <div className="w-full flex items-center justify-center page">
        <Spinner size="lg" />
      </div>
    )

  if (query.isError) {
    return (
      <div className="w-full flex flex-col gap-4 items-center justify-center page">
        <p>Không tìm thấy sản phẩm</p>
        <Link href="/san-pham">
          <Button color="gray">Trở về trang sản phẩm</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="page flex flex-col">
      <div className="flex flex-col gap-8 lg:flex-row">
        <ProductShowcase />
        <ProductDescription />
      </div>
      <ProductPreview />
    </div>
  )
}

export default ProductDetailPage
