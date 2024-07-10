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
  const [setProduct, setProductImages, setIsPreviewing] = useProductDetailStore(
    useShallow((state) => [state.setProduct, state.setProductImages, state.setIsPreviewing]),
  )

  const query = useQuery({
    queryKey: ['product', params.simplifiedName],
    queryFn: async (): Promise<any> => {
      const response = await fetch(`${ENV.API_URL}/product/simplified-name/${params.simplifiedName}`)
      return (await response.json()).data
    },
  })

  useEffect(() => {
    if (query.isSuccess) {
      setProduct(query.data)
      setProductImages(query.data.productImages || [])
      setIsPreviewing(false)
    }
  }, [query.isSuccess, query.data, setProduct, setProductImages, setIsPreviewing])

  if (query.isLoading)
    return (
      <div className="w-full flex justify-center my-12">
        <Spinner />
      </div>
    )

  return <>{children}</>
}

export default ProductDetailLayout
