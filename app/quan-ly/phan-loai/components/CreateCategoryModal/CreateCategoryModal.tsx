'use client'
import React from 'react'
import { Button, Label, Modal, ModalBody, ModalHeader, TextInput, Textarea, ToggleSwitch } from 'flowbite-react'
import { useState } from 'react'
import useAdminCategoryStore from '../../hooks/useAdminCategoryStore'
import { useMutation } from '@tanstack/react-query'
import { ENV } from '@/utils/constant'
import { toast } from 'react-toastify'
import { queryClient } from '@/components/Providers/QueryProvider'

const CreateCategoryModal = () => {
  const [openModal, setOpenModal] = useState(false)
  const createCategorySchema = useAdminCategoryStore((state) => state.createCategorySchema)
  const setCreateCategorySchema = useAdminCategoryStore((state) => state.setCreateCategorySchema)
  const clearCreateCategorySchema = useAdminCategoryStore((state) => state.clearCreateCategorySchema)

  const createCategory = useMutation({
    mutationFn: async (category: { name: string; description: string | null; isPublished: boolean }) => {
      const response = await fetch(`${ENV.API_URL}/category`, {
        method: 'POST',
        body: JSON.stringify(category),
      })
      return await response.json()
    },
    onSuccess: (res) => {
      if (!res.data) {
        toast.error(res.message)
        return
      }
      toast.success('Tạo phân loại thành công')
      queryClient.invalidateQueries({ queryKey: ['category'] })
    },
    onError: () => {
      toast.error('Tạo phân loại thất bại')
    },
  })

  return (
    <>
      <Button color="info" onClick={() => setOpenModal(true)}>
        Tạo phân loại
      </Button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => {
          setOpenModal(false)
        }}
        popup
      >
        <ModalHeader>Tạo phân loại</ModalHeader>
        <ModalBody>
          <form
            className="flex max-w-md flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault()
              createCategory.mutate(createCategorySchema)
              clearCreateCategorySchema()
            }}
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="category-name" value="Tên*" />
              </div>
              <TextInput
                id="category-name"
                type="text"
                placeholder="..."
                required
                value={createCategorySchema.name}
                min={1}
                max={255}
                onChange={(e) => {
                  setCreateCategorySchema({ ...createCategorySchema, name: e.target.value })
                }}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="category-description" value="Mô tả" />
              </div>
              <Textarea
                id="category-description"
                placeholder="..."
                rows={4}
                value={createCategorySchema.description || ''}
                onChange={(e) => {
                  setCreateCategorySchema({ ...createCategorySchema, description: e.target.value })
                }}
              />
            </div>
            <ToggleSwitch
              checked={createCategorySchema.isPublished}
              label="Hiển thị công khai"
              onChange={(checked: boolean) => {
                setCreateCategorySchema({ ...createCategorySchema, isPublished: checked })
              }}
            />
            <Button type="submit">Submit</Button>
          </form>
        </ModalBody>
      </Modal>
    </>
  )
}

export default CreateCategoryModal
