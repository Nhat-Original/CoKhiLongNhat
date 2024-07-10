'use client'
import React from 'react'
import { Button, Modal, ModalBody, ModalHeader, Spinner } from 'flowbite-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ENV } from '@/utils/constant'
import { toast } from 'react-toastify'
import { queryClient } from '@/components/Providers/QueryProvider'
import { Product, ProductImage } from '@prisma/client'
import useAdminProductStore from '../../hooks/useAdminProductStore'
import { useShallow } from 'zustand/react/shallow'
import { MdDelete } from 'react-icons/md'
import { CldUploadButton, CloudinaryUploadWidgetInfo } from 'next-cloudinary'

const UpdateProductImageModal = () => {
  const [
    updatingProductId,
    isUpdatingImages,
    setIsUpdatingImages,
    // updateProductImagesSchema,
    // setUpdateProductImagesSchema,
  ] = useAdminProductStore(
    useShallow((state) => [
      state.updatingProductId,
      state.isUpdatingImages,
      state.setIsUpdatingImages,
      // state.updateProductImagesSchema,
      // state.setUpdateProductImagesSchema,
    ]),
  )

  const query = useQuery({
    queryKey: ['product', updatingProductId],
    queryFn: async (): Promise<Product & { productImages: ProductImage[] }> => {
      let response
      if (updatingProductId) response = await fetch(`${ENV.API_URL}/product/${updatingProductId}`)
      return (await response?.json()).data
    },
  })
  const product = query.data

  const createProductImage = useMutation({
    mutationFn: async (url: string) => {
      const response = await fetch(`${ENV.API_URL}/product/${updatingProductId}/product-image`, {
        method: 'POST',
        body: JSON.stringify({ url }),
      })
      return await response.json()
    },
    onSuccess: (res) => {
      if (!res.data) {
        toast.error(res.message)
        return
      }
      toast.success('Thêm hình ảnh sản phẩm thành công')
      queryClient.invalidateQueries({ queryKey: ['product'] })
    },
    onError: () => {
      toast.error('Thêm hình ảnh sản phẩm thất bại')
    },
  })

  const removeProductImage = useMutation({
    mutationFn: async (productImageId: string) => {
      const response = await fetch(`${ENV.API_URL}/product/${updatingProductId}/product-image/${productImageId}`, {
        method: 'DELETE',
      })
      return await response.json()
    },
    onSuccess: (res) => {
      if (!res.data) {
        toast.error(res.message)
        return
      }
      toast.success('Xóa hình ảnh sản phẩm thành công')
      queryClient.invalidateQueries({ queryKey: ['product'] })
    },
    onError: () => {
      toast.error('Xóa hình ảnh sản phẩm thất bại')
    },
  })

  return (
    <Modal
      show={isUpdatingImages}
      size="md"
      onClose={() => {
        setIsUpdatingImages(false)
      }}
      popup
    >
      <ModalHeader>Cập nhật hình ảnh sản phẩm</ModalHeader>
      <ModalBody>
        {query.isLoading ? (
          <Spinner />
        ) : (
          <div className="flex max-w-md flex-col gap-4">
            <CldUploadButton
              uploadPreset={ENV.CLOUDINARY_UPLOAD_PRESET}
              className="w-fit font-semibold text-white bg-cyan-600 rounded-md py-2 px-5  mx-auto"
              onSuccess={({ info }) => {
                if (typeof info === 'string') return
                createProductImage.mutate((info as CloudinaryUploadWidgetInfo)?.url)
              }}
            >
              Tải lên hình ảnh
            </CldUploadButton>
            <div className="flex justify-center flex-wrap">
              {product?.productImages?.map((image) => (
                <div className="w-36 aspect-square border relative" key={image.id}>
                  <img className="w-full h-full object-cover" src={image.url} alt={`product image ${image.id}`} />
                  <Button
                    size={'xs'}
                    color="transparent"
                    className="absolute top-0 right-0 font-medium text-red-600 hover:underline"
                    onClick={() => {
                      removeProductImage.mutate(image.id)
                    }}
                  >
                    <MdDelete className="h-6 w-6" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </ModalBody>
    </Modal>
  )
}

export default UpdateProductImageModal
