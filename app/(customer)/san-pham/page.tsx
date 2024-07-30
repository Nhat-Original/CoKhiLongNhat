import React from 'react'
import Gallery from './components/Gallery'
import SearchProductBar from './components/SearchProductBar'
import CategoryFilter from './components/CategoryFilter'
import ProductCounter from './components/ProductCounter'

const ProductPage = () => {
  return (
    <div className="flex flex-col mb-12 gap-12">
      <div className="sticky top-[70px] flex items-center gap-4 py-2 px-8 bg-gray-800 bg-opacity-80 rounded-md z-[1]">
        <SearchProductBar />
        <CategoryFilter />
        <ProductCounter />
      </div>
      <Gallery />
    </div>
  )
}

export default ProductPage
