'use client'
import { useQuery } from '@tanstack/react-query'
import useProductDetailStore from './hooks/useProductDetailStore'
import { ENV } from '@/utils/constant'
import { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { Spinner } from 'flowbite-react'

const ProductDetailLayout = ({
  children,
  params,
}: {
  children: React.ReactNode
  params: { simplifiedName: string }
}) => {
  const [setProduct, setProductImages, setIsPreviewing, setIsFavorite] = useProductDetailStore(
    useShallow((state) => [state.setProduct, state.setProductImages, state.setIsPreviewing, state.setIsFavorite]),
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
      <div className="w-full flex justify-center my-12">
        <Spinner />
      </div>
    )

  if (query.isError) {
    return <div className="w-full flex justify-center my-12">Không tìm thấy sản phẩm</div>
  }

  return <>{children}</>
}

export default ProductDetailLayout
