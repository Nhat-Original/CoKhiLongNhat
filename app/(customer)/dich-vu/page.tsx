import React from 'react'
import Gallery from './components/Gallery'
import { Metadata } from 'next'

const metadata: Metadata = {
  title: 'Dịch vụ | Cơ Khí Long Nhật',
  description: 'Các dịch vụ được Cơ Khí Long Nhật cung cấp',
}

const ServicePage = () => {
  return (
    <div className="mt-12 mb-12">
      <Gallery />
    </div>
  )
}

export default ServicePage
export { metadata }
