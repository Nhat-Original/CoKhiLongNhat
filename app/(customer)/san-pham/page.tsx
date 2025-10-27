import React from 'react'
import Gallery from './components/Gallery'
import SearchProductBar from './components/SearchProductBar'
import CategoryFilter from './components/CategoryFilter'
import ProductCounter from './components/ProductCounter'
import { Metadata } from 'next'

const metadata: Metadata = {
  title: 'Sản phẩm | Cơ Khí Long Nhật',
  description: 'Các sản phẩm được Cơ Khí Long Nhật cung cấp',
}

const ProductPage = () => {
  return (
    <div className="flex flex-col mb-12 gap-12">
      <div className="sticky top-[70px] flex items-center gap-1 sm:gap-4 py-2 px-1 sm:px-8 bg-gray-800 bg-opacity-80 rounded-md z-[1]">
        <SearchProductBar />
        <CategoryFilter />
        <ProductCounter />
      </div>
      <Gallery />
    </div>
  )
}

export default ProductPage
export { metadata }
