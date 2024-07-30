import React from 'react'
import ProductShowcase from './components/ProductShowcase'
import ProductPreview from './components/ProductPreview'
import ProductDescription from './components/ProductDescription'

const ProductDetailPage = () => {
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
