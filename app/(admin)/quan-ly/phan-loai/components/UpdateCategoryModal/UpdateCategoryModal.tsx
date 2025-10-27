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
import useAdminCategoryStore from '../../stores/useAdminCategoryStore'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ENV } from '@/utils/constant'
import { toast } from 'react-toastify'
import { queryClient } from '@/components/Providers/QueryProvider'
import { Category } from '@prisma/client'
import { CreateCategorySchema } from '@/app/api/category/schemas/createCategorySchema'

const UpdateCategoryModal = () => {
  const updatingCategoryId = useAdminCategoryStore((state) => state.updatingCategoryId)
  const isUpdatingCategory = useAdminCategoryStore((state) => state.isUpdatingCategory)
  const setIsUpdatingCategory = useAdminCategoryStore((state) => state.setIsUpdatingCategory)
  const updateCategorySchema = useAdminCategoryStore((state) => state.updateCategorySchema)
  const setUpdateCategorySchema = useAdminCategoryStore((state) => state.setUpdateCategorySchema)

  const query = useQuery({
    queryKey: ['category', updatingCategoryId],
    queryFn: async (): Promise<Category & { _count: { products: number } }> => {
      let response
      if (updatingCategoryId) response = await fetch(`${ENV.NEXT_PUBLIC_API_URL}/category/${updatingCategoryId}`)
      return (await response?.json()).data
    },
  })
  const category = query.data

  useEffect(() => {
    if (category) {
      setUpdateCategorySchema({
        name: category.name,
        description: category.description,
        isPublished: category.isPublished,
      })
    }
  }, [category, setUpdateCategorySchema])

  const updateCategory = useMutation({
    mutationFn: async (category: CreateCategorySchema) => {
      const response = await fetch(`${ENV.NEXT_PUBLIC_API_URL}/category/${updatingCategoryId}`, {
        method: 'PATCH',
        body: JSON.stringify(category),
      })
      return await response.json()
    },
    onSuccess: (res) => {
      if (!res.data) {
        toast.error(res.message)
        if (category) {
          setUpdateCategorySchema({
            name: category.name,
            description: category.description,
            isPublished: category.isPublished,
          })
        }
        return
      }

      toast.success('Cập nhật phân loại thành công')
      queryClient.invalidateQueries({ queryKey: ['category'] })
    },
    onError: () => {
      toast.error('Cập nhật phân loại thất bại')
    },
  })

  return (
    <Modal
      show={isUpdatingCategory}
      size="md"
      onClose={() => {
        setIsUpdatingCategory(false)
      }}
      popup
    >
      <ModalHeader>Cập nhật phân loại</ModalHeader>
      <ModalBody>
        {query.isLoading || updateCategory.isPending ? (
          <Spinner />
        ) : (
          <form
            className="flex max-w-md flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault()
              updateCategory.mutate(updateCategorySchema)
            }}
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="category-name" value="Tên*" />
              </div>
              <TextInput
                id="category-name"
                type="text"
                required
                value={updateCategorySchema.name}
                min={1}
                max={255}
                onChange={(e) => {
                  setUpdateCategorySchema({ ...updateCategorySchema, name: e.target.value })
                }}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="category-description" value="Mô tả" />
              </div>
              <Textarea
                id="category-description"
                rows={4}
                value={updateCategorySchema.description || ''}
                onChange={(e) => {
                  setUpdateCategorySchema({ ...updateCategorySchema, description: e.target.value })
                }}
              />
            </div>
            {/* temporary fix to set the disability of category to be always true */}
            <ToggleSwitch
              disabled
              checked={updateCategorySchema.isPublished}
              label="Hiển thị công khai"
              onChange={(checked: boolean) => {
                setUpdateCategorySchema({ ...updateCategorySchema, isPublished: checked })
              }}
            />
            <Button type="submit">Cập nhật</Button>
          </form>
        )}
      </ModalBody>
    </Modal>
  )
}

export default UpdateCategoryModal
