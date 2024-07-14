'use client'
import React from 'react'
import productPlaceholder from '@/public/images/productPlaceholder.png'
import useProductDetailStore from '../../hooks/useProductDetailStore'
import { useShallow } from 'zustand/react/shallow'

const ProductShowcase = () => {
  const [productImages, setIsPreviewing, setPreviewImageIndex] = useProductDetailStore(
    useShallow((state) => [state.productImages, state.setIsPreviewing, state.setPreviewImageIndex]),
  )

  const handlePreview = (previewImageIndex: number) => {
    setIsPreviewing(true)
    setPreviewImageIndex(previewImageIndex)
  }

  return (
    <div className="w-full max-w-md grid gap-2 grid-cols-3 [&_img]:rounded-md [&_img]:aspect-square [&_img]:object-cover [&_img]:w-full">
      {productImages.length === 0 ? (
        <img src={productPlaceholder.src} alt="product image" className="col-span-3" />
      ) : productImages.length <= 4 ? (
        <>
          <img
            src={productImages[0].url}
            alt={`product image ${productImages[0].id}`}
            className="col-span-3 hover:cursor-pointer hover:border-2 hover:border-cyan-600"
            onClick={() => handlePreview(0)}
          />
          {productImages.slice(1).map((image, index) => (
            <img
              key={image.id}
              src={image.url}
              alt={`product image ${image.id}`}
              className=" hover:cursor-pointer hover:border-2 hover:border-cyan-600"
              onClick={() => handlePreview(index + 1)}
            />
          ))}
        </>
      ) : (
        <>
          <img
            src={productImages[0].url}
            alt={`product image ${productImages[0].id}`}
            className="col-span-3  hover:cursor-pointer hover:border-2 hover:border-cyan-600"
            onClick={() => handlePreview(0)}
          />
          <img
            src={productImages[1].url}
            alt={`product image ${productImages[1].id}`}
            className=" hover:cursor-pointer hover:border-2 hover:border-cyan-600"
            onClick={() => handlePreview(1)}
          />
          <img
            src={productImages[2].url}
            alt={`product image ${productImages[2].id}`}
            className=" hover:cursor-pointer hover:border-2 hover:border-cyan-600"
            onClick={() => handlePreview(2)}
          />
          <div className="w-full aspect-square relative">
            <img src={productImages[3].url} alt={`product image ${productImages[3].id}`} className=" " />
            <div
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-semibold text-xl rounded-md hover:cursor-pointer hover:border-2 hover:border-cyan-600"
              onClick={() => handlePreview(3)}
            >
              +{productImages.length - 4}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ProductShowcase
