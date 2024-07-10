import React from 'react'
import ProductShowcase from './components/ProductShowcase'
import ProductPreview from './components/ProductPreview'
import ProductDescription from './components/ProductDescription'

const ProductDetailPage = () => {
  return (
    <div className="my-12 flex flex-col border">
      <div className="flex flex-col lg:flex-row">
        <ProductShowcase />
        <ProductPreview />
        <ProductDescription />
      </div>
    </div>
  )
}

export default ProductDetailPage
