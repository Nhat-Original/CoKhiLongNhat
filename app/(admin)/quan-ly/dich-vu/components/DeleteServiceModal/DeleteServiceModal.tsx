'use client'
import React from 'react'
import { Button, Modal, ModalBody, ModalHeader } from 'flowbite-react'
import { useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import useAdminServiceStore from '../../stores/useAdminServiceStore'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/components/Providers/QueryProvider'
import { ENV } from '@/utils/constant'
import { toast } from 'react-toastify'

const DeleteServiceModal = () => {
  const serviceIdList = useAdminServiceStore((state) => state.serviceIdList)
  const clearServiceIdList = useAdminServiceStore((state) => state.clearServiceIdList)
  const [openModal, setOpenModal] = useState(false)

  const deleteService = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${ENV.NEXT_PUBLIC_API_URL}/service/${id}`, {
        method: 'DELETE',
      })
      const objectResponse = await response.json()
      return objectResponse.data
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['service'] })
      toast.success('Xóa dịch vụ thành công')
    },
  })

  return (
    <>
      <Button color="failure" onClick={() => setOpenModal(true)} className={serviceIdList.length === 0 ? 'hidden' : ''}>
        Xóa {serviceIdList.length} dịch vụ
      </Button>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Bạn có chắc chắn muốn xóa {serviceIdList.length} dịch vụ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  setOpenModal(false)
                  serviceIdList.forEach((categoryId) => {
                    deleteService.mutate(categoryId)
                  })
                  clearServiceIdList()
                }}
              >
                Xác nhận xóa
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Hủy bỏ
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  )
}

export default DeleteServiceModal
