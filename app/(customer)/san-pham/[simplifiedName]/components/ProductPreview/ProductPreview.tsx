'use client'
import React from 'react'
import { Button, Modal } from 'flowbite-react'
import useProductDetailStore from '../../stores/useProductDetailStore'
import { MdArrowLeft, MdArrowRight } from 'react-icons/md'

const ProductPreview = () => {
  const [productImages, isPreviewing, setIsPreviewing, previewImageIndex, setPreviewImageIndex] = useProductDetailStore(
    (state) => [
      state.productImages,
      state.isPreviewing,
      state.setIsPreviewing,
      state.previewImageIndex,
      state.setPreviewImageIndex,
    ],
  )

  return (
    <Modal
      dismissible
      show={isPreviewing}
      onClose={() => {
        setIsPreviewing(false)
        setPreviewImageIndex(0)
      }}
    >
      <Modal.Header>Hình ảnh sản phẩm</Modal.Header>
      <Modal.Body>
        <p>{`${previewImageIndex + 1} / ${productImages.length}`}</p>
        <div className="w-full aspect-square relative">
          <img
            className="w-full h-full object-cover rounded-md"
            src={productImages[previewImageIndex]?.url}
            alt={`product image ${productImages[previewImageIndex]?.id}`}
          />
          <Button
            size={'xs'}
            className="rounded-full aspect-square opacity-50 bg-white absolute -translate-y-1/2 top-1/2 left-1 font-medium text-cyan-600 hover:underline dark:text-cyan-500"
            onClick={() => {
              setPreviewImageIndex((previewImageIndex - 1 + productImages.length) % productImages.length)
            }}
          >
            <MdArrowLeft className="h-8 w-8" />
          </Button>
          <Button
            size={'xs'}
            className="rounded-full aspect-square opacity-50 bg-white absolute -translate-y-1/2 top-1/2 right-1 font-medium text-cyan-600 hover:underline dark:text-cyan-500"
            onClick={() => {
              setPreviewImageIndex((previewImageIndex + 1) % productImages.length)
            }}
          >
            <MdArrowRight className="h-8 w-8" />
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ProductPreview
