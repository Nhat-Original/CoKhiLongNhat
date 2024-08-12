'use client'
import React from 'react'
import { Button, Label, Modal, ModalBody, ModalHeader, TextInput, Textarea, ToggleSwitch } from 'flowbite-react'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { ENV } from '@/utils/constant'
import { toast } from 'react-toastify'
import { queryClient } from '@/components/Providers/QueryProvider'
import { CreateServiceSchema } from '@/app/api/service/schemas/createServiceSchema'
import useAdminServiceStore from '../../stores/useAdminServiceStore'

const CreateServiceModal = () => {
  const [openModal, setOpenModal] = useState(false)
  const createServiceSchema = useAdminServiceStore((state) => state.createServiceSchema)
  const setCreateServiceSchema = useAdminServiceStore((state) => state.setCreateServiceSchema)
  const clearCreateServiceSchema = useAdminServiceStore((state) => state.clearCreateServiceSchema)

  const createService = useMutation({
    mutationFn: async (service: CreateServiceSchema) => {
      const response = await fetch(`${ENV.NEXT_PUBLIC_API_URL}/service`, {
        method: 'POST',
        body: JSON.stringify(service),
      })
      return await response.json()
    },
    onSuccess: (res) => {
      if (!res.data) {
        toast.error(res.message)
        return
      }
      toast.success('Tạo dịch vụ thành công')
      queryClient.invalidateQueries({ queryKey: ['service'] })
    },
    onError: () => {
      toast.error('Tạo dịch vụ thất bại')
    },
  })

  return (
    <>
      <Button color="info" onClick={() => setOpenModal(true)}>
        Tạo dịch vụ
      </Button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => {
          setOpenModal(false)
        }}
        popup
      >
        <ModalHeader>Tạo dịch vụ</ModalHeader>
        <ModalBody>
          <form
            className="flex max-w-md flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault()
              createService.mutate(createServiceSchema)
              clearCreateServiceSchema()
            }}
          >
            <div>
              <Label htmlFor="service-name">Tên dịch vụ*</Label>
              <TextInput
                id="service-name"
                type="text"
                required
                value={createServiceSchema.name}
                min={1}
                max={255}
                onChange={(e) => {
                  setCreateServiceSchema({ ...createServiceSchema, name: e.target.value })
                }}
              />
            </div>

            <div>
              <Label htmlFor="service-description">Mô tả</Label>
              <Textarea
                id="service-description"
                rows={4}
                value={createServiceSchema.description || ''}
                onChange={(e) => {
                  setCreateServiceSchema({ ...createServiceSchema, description: e.target.value || null })
                }}
              />
            </div>

            <div className="flex gap-4 items-center">
              <ToggleSwitch
                checked={createServiceSchema.isPublished}
                label="Hiển thị công khai"
                onChange={(checked: boolean) => {
                  setCreateServiceSchema({ ...createServiceSchema, isPublished: checked })
                }}
              />
            </div>

            <Button type="submit">Tạo</Button>
          </form>
        </ModalBody>
      </Modal>
    </>
  )
}

export default CreateServiceModal
