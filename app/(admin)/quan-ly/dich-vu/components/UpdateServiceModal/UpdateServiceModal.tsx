'use client'
import React, { useEffect } from 'react'
import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Spinner,
  TextInput,
  Textarea,
  ToggleSwitch,
} from 'flowbite-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ENV } from '@/utils/constant'
import { toast } from 'react-toastify'
import { queryClient } from '@/components/Providers/QueryProvider'
import { Service } from '@prisma/client'
import useAdminServiceStore from '../../stores/useAdminServiceStore'
import { useShallow } from 'zustand/react/shallow'
import { CreateServiceSchema } from '@/app/api/service/schemas/createServiceSchema'

const UpdateServiceModal = () => {
  const [updatingServiceId, isUpdatingService, setIsUpdatingService, updateServiceSchema, setUpdateServiceSchema] =
    useAdminServiceStore(
      useShallow((state) => [
        state.updatingServiceId,
        state.isUpdatingService,
        state.setIsUpdatingService,
        state.updateServiceSchema,
        state.setUpdateServiceSchema,
      ]),
    )

  const query = useQuery({
    queryKey: ['service', updatingServiceId],
    queryFn: async (): Promise<Service> => {
      let response
      if (updatingServiceId) response = await fetch(`${ENV.NEXT_PUBLIC_API_URL}/service/${updatingServiceId}`)
      return (await response?.json()).data
    },
  })
  const service = query.data

  useEffect(() => {
    if (service) {
      setUpdateServiceSchema({
        isPublished: service.isPublished,
        name: service.name,
        description: service.description,
      })
    }
  }, [service, setUpdateServiceSchema])

  const updateService = useMutation({
    mutationFn: async (service: CreateServiceSchema) => {
      const response = await fetch(`${ENV.NEXT_PUBLIC_API_URL}/service/${updatingServiceId}`, {
        method: 'PATCH',
        body: JSON.stringify(service),
      })
      return await response.json()
    },
    onSuccess: (res) => {
      if (!res.data) {
        toast.error(res.message)
        if (service) {
          setUpdateServiceSchema({
            isPublished: service.isPublished,
            name: service.name,
            description: service.description,
          })
        }
        return
      }

      toast.success('Cập nhật dịch vụ thành công')
      queryClient.invalidateQueries({ queryKey: ['service'] })
    },
    onError: () => {
      toast.error('Cập nhật dịch vụ thất bại')
    },
  })

  return (
    <Modal
      show={isUpdatingService}
      size="md"
      onClose={() => {
        setIsUpdatingService(false)
      }}
      popup
    >
      <ModalHeader>Cập nhật dịch vụ</ModalHeader>
      <ModalBody>
        {query.isLoading || updateService.isPending ? (
          <Spinner />
        ) : (
          <form
            className="flex max-w-md flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault()
              updateService.mutate(updateServiceSchema)
            }}
          >
            <div>
              <Label htmlFor="service-name">Tên dịch vụ*</Label>
              <TextInput
                id="service-name"
                type="text"
                required
                value={updateServiceSchema.name}
                min={1}
                max={255}
                onChange={(e) => {
                  setUpdateServiceSchema({ ...updateServiceSchema, name: e.target.value })
                }}
              />
            </div>

            <div>
              <Label htmlFor="service-description">Mô tả</Label>
              <Textarea
                id="service-description"
                rows={4}
                value={updateServiceSchema.description || ''}
                onChange={(e) => {
                  setUpdateServiceSchema({ ...updateServiceSchema, description: e.target.value || null })
                }}
              />
            </div>

            <div className="flex gap-4 items-center">
              <ToggleSwitch
                checked={updateServiceSchema.isPublished}
                label="Hiển thị công khai"
                onChange={(checked: boolean) => {
                  setUpdateServiceSchema({ ...updateServiceSchema, isPublished: checked })
                }}
              />
            </div>
            <Button type="submit">Cập nhật</Button>
          </form>
        )}
      </ModalBody>
    </Modal>
  )
}

export default UpdateServiceModal
