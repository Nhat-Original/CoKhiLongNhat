import React from 'react'
import IntroductionCarousel from './components/IntroductionCarousel'
import ProductShowcase from './components/ProductShowcase'

const HomePage = () => {
  return (
    <div className="my-12 flex flex-col gap-24">
      <IntroductionCarousel />
      <ProductShowcase />
    </div>
  )
}

export default HomePage
