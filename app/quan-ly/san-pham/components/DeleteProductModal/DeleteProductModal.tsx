'use client'
import React from 'react'
import { Button, Modal, ModalBody, ModalHeader } from 'flowbite-react'
import { useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import useAdminProductStore from '../../stores/useAdminProductStore'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/components/Providers/QueryProvider'
import { ENV } from '@/utils/constant'
import { toast } from 'react-toastify'

const DeleteProductModal = () => {
  const productIdList = useAdminProductStore((state) => state.productIdList)
  const clearProductIdList = useAdminProductStore((state) => state.clearProductIdList)
  const [openModal, setOpenModal] = useState(false)

  const deleteProduct = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${ENV.NEXT_PUBLIC_API_URL}/product/${id}`, {
        method: 'DELETE',
      })
      const objectResponse = await response.json()
      return objectResponse.data
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['product'] })
      toast.success('Xóa sản phẩm thành công')
    },
  })

  return (
    <>
      <Button color="failure" onClick={() => setOpenModal(true)} className={productIdList.length === 0 ? 'hidden' : ''}>
        Xóa {productIdList.length} sản phẩm
      </Button>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Bạn có chắc chắn muốn xóa {productIdList.length} sản phầm?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  setOpenModal(false)
                  productIdList.forEach((categoryId) => {
                    deleteProduct.mutate(categoryId)
                  })
                  clearProductIdList()
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

export default DeleteProductModal
