'use client'
import React from 'react'
import useProductStore from '../../stores/useProductStore'

const ProductCounter = () => {
  const productCount = useProductStore((state) => state.productCount)

  return <p className="text-white font-semibold">Số sản phẩm: {productCount}</p>
}

export default ProductCounter
