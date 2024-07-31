'use client'
import { useQuery } from '@tanstack/react-query'
import useProductDetailStore from './stores/useProductDetailStore'
import { ENV } from '@/utils/constant'
import { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { Button, Spinner } from 'flowbite-react'
import Link from 'next/link'
import Head from 'next/head'

const ProductDetailLayout = ({
  children,
  params,
}: {
  children: React.ReactNode
  params: { simplifiedName: string }
}) => {
  const [setProduct, setProductImages, setIsPreviewing, setIsFavorite, product] = useProductDetailStore(
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
      const response = await fetch(`${ENV.API_URL}/product/simplified-name/${params.simplifiedName}`)
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
      <>
        <Head>
          <title>Không tìm thấy sản phẩm | Cơ Khí Long Nhật</title>
          <meta name="description" content="Không tìm thấy sản phẩm" />
        </Head>

        <div className="w-full flex flex-col gap-4 items-center justify-center page">
          <p>Không tìm thấy sản phẩm</p>
          <Link href="/san-pham">
            <Button color="gray">Trở về trang sản phẩm</Button>
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{product?.name || 'Sản phẩm'} | Cơ Khí Long Nhật</title>
        <meta name="description" content={product?.description || 'Chưa có mô tả sản phẩm'} />
      </Head>

      {children}
    </>
  )
}

export default ProductDetailLayout
