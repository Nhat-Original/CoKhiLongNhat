// TODO: product detail page
import React from 'react'

const ProductDetailPage = ({ params }: { params: { simplifiedName: string } }) => {
  return <div>page {params.simplifiedName}</div>
}

export default ProductDetailPage
