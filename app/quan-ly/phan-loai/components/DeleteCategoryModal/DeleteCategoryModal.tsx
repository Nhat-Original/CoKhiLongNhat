'use client'

import { Button, Modal, ModalBody, ModalHeader } from 'flowbite-react'
import { useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import useAdminCategoryStore from '../../hooks/useAdminCategoryStore'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/components/Providers/QueryProvider'
import { ENV } from '@/utils/constant'

const DeleteCategoryModal = () => {
  const categoryIdList = useAdminCategoryStore((state) => state.categoryIdList)
  const [openModal, setOpenModal] = useState(false)
  const deleteCategory = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${ENV.API_URL}category/${id}`, {
        method: 'DELETE',
      })
      const objectResponse = await response.json()
      return objectResponse.data
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['category'] })
    },
  })

  return (
    <>
      <Button
        color="failure"
        onClick={() => setOpenModal(true)}
        className={categoryIdList.length === 0 ? 'hidden' : ''}
      >
        Xóa {categoryIdList.length} phân loại
      </Button>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Xóa {categoryIdList.length} phân loại?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  setOpenModal(false)
                  categoryIdList.forEach((categoryId) => {
                    deleteCategory.mutate(categoryId)
                  })
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

export default DeleteCategoryModal
