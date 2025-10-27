'use client'
import React from 'react'
import { Button, Modal, ModalBody, ModalHeader, Spinner } from 'flowbite-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ENV } from '@/utils/constant'
import { toast } from 'react-toastify'
import { queryClient } from '@/components/Providers/QueryProvider'
import { Service, ServiceImage } from '@prisma/client'
import useAdminServiceStore from '../../stores/useAdminServiceStore'
import { useShallow } from 'zustand/react/shallow'
import { MdDelete } from 'react-icons/md'
import { CldUploadButton, CloudinaryUploadWidgetInfo } from 'next-cloudinary'

const UpdateServiceImageModal = () => {
  const [
    updatingServiceId,
    isUpdatingImages,
    setIsUpdatingImages,
    // updateServiceImagesSchema,
    // setUpdateServiceImagesSchema,
  ] = useAdminServiceStore(
    useShallow((state) => [
      state.updatingServiceId,
      state.isUpdatingImages,
      state.setIsUpdatingImages,
      // state.updateServiceImagesSchema,
      // state.setUpdateServiceImagesSchema,
    ]),
  )

  const query = useQuery({
    queryKey: ['service', updatingServiceId],
    queryFn: async (): Promise<Service & { serviceImages: ServiceImage[] }> => {
      let response
      if (updatingServiceId) response = await fetch(`${ENV.NEXT_PUBLIC_API_URL}/service/${updatingServiceId}`)
      return (await response?.json()).data
    },
  })
  const service = query.data

  const createServiceImage = useMutation({
    mutationFn: async (url: string) => {
      const response = await fetch(`${ENV.NEXT_PUBLIC_API_URL}/service/${updatingServiceId}/service-image`, {
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
      toast.success('Thêm hình ảnh dịch vụ thành công')
      queryClient.invalidateQueries({ queryKey: ['service'] })
    },
    onError: () => {
      toast.error('Thêm hình ảnh dịch vụ thất bại')
    },
  })

  const removeServiceImage = useMutation({
    mutationFn: async (serviceImageId: string) => {
      const response = await fetch(
        `${ENV.NEXT_PUBLIC_API_URL}/service/${updatingServiceId}/service-image/${serviceImageId}`,
        {
          method: 'DELETE',
        },
      )
      return await response.json()
    },
    onSuccess: (res) => {
      if (!res.data) {
        toast.error(res.message)
        return
      }
      toast.success('Xóa hình ảnh dịch vụ thành công')
      queryClient.invalidateQueries({ queryKey: ['service'] })
    },
    onError: () => {
      toast.error('Xóa hình ảnh dịch vụ thất bại')
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
      <ModalHeader>Cập nhật hình ảnh dịch vụ</ModalHeader>
      <ModalBody>
        {query.isLoading ? (
          <Spinner />
        ) : (
          <div className="flex max-w-md flex-col gap-4">
            <CldUploadButton
              uploadPreset={ENV.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
              className="w-fit font-semibold text-white bg-cyan-600 rounded-md py-2 px-5  mx-auto"
              onSuccess={({ info }) => {
                if (typeof info === 'string') return
                createServiceImage.mutate((info as CloudinaryUploadWidgetInfo)?.url)
              }}
            >
              Tải lên hình ảnh
            </CldUploadButton>
            <div className="flex justify-center flex-wrap">
              {service?.serviceImages?.map((image) => (
                <div className="w-36 aspect-square border relative" key={image.id}>
                  <img className="w-full h-full object-cover" src={image.url} alt={`service image ${image.id}`} />
                  <Button
                    size={'xs'}
                    color="transparent"
                    className="absolute top-0 right-0 font-medium text-red-600 hover:underline"
                    onClick={() => {
                      removeServiceImage.mutate(image.id)
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

export default UpdateServiceImageModal
