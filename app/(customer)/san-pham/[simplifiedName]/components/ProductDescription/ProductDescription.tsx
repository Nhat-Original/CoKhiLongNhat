'use client'
import React from 'react'
import useProductDetailStore from '../../stores/useProductDetailStore'
import { useShallow } from 'zustand/react/shallow'
import { Badge } from 'flowbite-react'
// import FavoriteButton from './FavoriteButton'
import ContactLinks from './ContactLinks'

const ProductDescription = () => {
  const [product] = useProductDetailStore(useShallow((state) => [state.product]))

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center">
        {/* <FavoriteButton /> */}
        <div className="font-bold text-2xl uppercase">{product?.name}</div>
        <Badge size={'sm'} color="info">
          {product?.category?.name || 'Không phân loại'}
        </Badge>
      </div>
      <div className="font-semibold text-3xl text-cyan-700">
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
      <div>{product?.description || <span className="italic">Chưa có mô tả sản phẩm</span>}</div>
      <ContactLinks />
    </div>
  )
}

export default ProductDescription
