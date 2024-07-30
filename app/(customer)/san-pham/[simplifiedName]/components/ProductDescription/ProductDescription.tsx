'use client'
import React from 'react'
import useProductDetailStore from '../../stores/useProductDetailStore'
import { useShallow } from 'zustand/react/shallow'
import { Badge, Button } from 'flowbite-react'
import Link from 'next/link'
import FavoriteButton from './FavoriteButton'

const ProductDescription = () => {
  const [product] = useProductDetailStore(useShallow((state) => [state.product]))

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center gap-2">
        <FavoriteButton />
        <div className="font-semibold text-2xl uppercase">{product?.name}</div>
        <Badge size={'sm'} color="info">
          {product?.category?.name || 'Không phân loại'}
        </Badge>
      </div>
      <div className="font-semibold text-3xl text-cyan-600">
        {product?.price && product?.quantity && product?.unit ? (
          <>{`${product.price.toLocaleString()}đ / ${product.quantity} ${product.unit}`}</>
        ) : product?.price ? (
          <>{`${product.price.toLocaleString()}đ`}</>
        ) : (
          <>Giá: Liên hệ</>
        )}
      </div>
      <div>
        <span className="font-bold">Trạng thái: </span>
        {product?.status === 'AVAILABLE' ? 'Còn hàng' : 'Hết hàng'}
      </div>
      <div>{product?.description || 'Chưa có mô tả sản phẩm'}</div>
      <Link href="/lien-he">
        <Button className="uppercase font-bold">Liên hệ đặt hàng</Button>
      </Link>
    </div>
  )
}

export default ProductDescription
