'use client'
import React from 'react'
import useProductStore from '../../stores/useProductStore'

const ProductCounter = () => {
  const productCount = useProductStore((state) => state.productCount)

  return <p className="text-xs text-white font-semibold min-w-max">{productCount} kết quả</p>
}

export default ProductCounter
