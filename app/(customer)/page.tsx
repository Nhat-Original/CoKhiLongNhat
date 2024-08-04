import React from 'react'
import IntroductionCarousel from './components/IntroductionCarousel'
import ProductShowcase from './components/ProductShowcase'

const ProductPage = () => {
  return (
    <div className="page flex flex-col gap-16">
      <IntroductionCarousel />
      <ProductShowcase />
    </div>
  )
}

export default ProductPage
