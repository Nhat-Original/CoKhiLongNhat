import React from 'react'
import IntroductionCarousel from './components/IntroductionCarousel'
import ProductShowcase from './components/ProductShowcase'
import ServiceShowcase from './components/ServiceShowcase'

const ProductPage = () => {
  return (
    <div className="page flex flex-col gap-16">
      <IntroductionCarousel />
      <ServiceShowcase />
      <ProductShowcase />
    </div>
  )
}

export default ProductPage
