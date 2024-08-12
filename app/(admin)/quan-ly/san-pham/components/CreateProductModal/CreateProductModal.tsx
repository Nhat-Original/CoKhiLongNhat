'use client'
import React from 'react'
import { Button, Label, Modal, ModalBody, ModalHeader, Select, TextInput, Textarea, ToggleSwitch } from 'flowbite-react'
import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ENV } from '@/utils/constant'
import { toast } from 'react-toastify'
import { queryClient } from '@/components/Providers/QueryProvider'
import { Category } from '@prisma/client'
import { CreateProductSchema } from '@/app/api/product/schemas/createProductSchema'
import useAdminProductStore from '../../stores/useAdminProductStore'

const CreateProductModal = () => {
  const [openModal, setOpenModal] = useState(false)
  const createProductSchema = useAdminProductStore((state) => state.createProductSchema)
  const setCreateProductSchema = useAdminProductStore((state) => state.setCreateProductSchema)
  const clearCreateProductSchema = useAdminProductStore((state) => state.clearCreateProductSchema)

  const query = useQuery({
    queryKey: ['category'],
    queryFn: async (): Promise<(Category & { _count: { products: number } })[]> => {
      const response = await fetch(`${ENV.NEXT_PUBLIC_API_URL}/category`)
      return (await response.json()).data
    },
  })
  const categoryList = query.data || []

  const createProduct = useMutation({
    mutationFn: async (product: CreateProductSchema) => {
      const response = await fetch(`${ENV.NEXT_PUBLIC_API_URL}/product`, {
        method: 'POST',
        body: JSON.stringify(product),
      })
      return await response.json()
    },
    onSuccess: (res) => {
      if (!res.data) {
        toast.error(res.message)
        return
      }
      toast.success('Tạo sản phẩm thành công')
      queryClient.invalidateQueries({ queryKey: ['product'] })
    },
    onError: () => {
      toast.error('Tạo sản phẩm thất bại')
    },
  })

  return (
    <>
      <Button color="info" onClick={() => setOpenModal(true)}>
        Tạo sản phẩm
      </Button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => {
          setOpenModal(false)
        }}
        popup
      >
        <ModalHeader>Tạo sản phẩm</ModalHeader>
        <ModalBody>
          <form
            className="flex max-w-md flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault()
              createProduct.mutate(createProductSchema)
              clearCreateProductSchema()
            }}
          >
            <div>
              <Label htmlFor="product-category">phân loại*</Label>
              <Select
                id="product-category"
                onChange={(e) => setCreateProductSchema({ ...createProductSchema, categoryId: e.target.value })}
                defaultValue={createProductSchema.name}
              >
                <option className="font-semibold" key="0" value="0">
                  Không phân loại
                </option>
                {categoryList.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <Label htmlFor="product-name">Tên sản phẩm*</Label>
              <TextInput
                id="product-name"
                type="text"
                required
                value={createProductSchema.name}
                min={1}
                max={255}
                onChange={(e) => {
                  setCreateProductSchema({ ...createProductSchema, name: e.target.value })
                }}
              />
            </div>

            <div>
              <Label htmlFor="product-description">Mô tả</Label>
              <Textarea
                id="product-description"
                rows={4}
                value={createProductSchema.description || ''}
                onChange={(e) => {
                  setCreateProductSchema({ ...createProductSchema, description: e.target.value || null })
                }}
              />
            </div>

            <div>
              <Label htmlFor="product-status">Trạng thái*</Label>
              <Select
                id="product-status"
                value={createProductSchema.status}
                onChange={(e) => {
                  setCreateProductSchema({
                    ...createProductSchema,
                    status: e.target.value as 'AVAILABLE' | 'UNAVAILABLE',
                  })
                }}
              >
                <option value="AVAILABLE">Còn hàng</option>
                <option value="UNAVAILABLE">Hết hàng</option>
              </Select>
            </div>

            <div>
              <Label htmlFor="product-price">Giá</Label>
              <TextInput
                id="product-price"
                type="number"
                pattern="[0-9]*"
                value={Number(createProductSchema.price).toLocaleString()}
                onChange={(e) => {
                  setCreateProductSchema({ ...createProductSchema, price: Number(e.target.value) || null })
                }}
              />
            </div>

            <div>
              <Label htmlFor="product-quantity">Số lượng</Label>
              <TextInput
                id="product-quantity"
                type="number"
                value={Number(createProductSchema.quantity)}
                onChange={(e) => {
                  setCreateProductSchema({ ...createProductSchema, quantity: Number(e.target.value) || null })
                }}
              />
            </div>

            <div>
              <Label htmlFor="product-unit">Đơn vị</Label>
              <TextInput
                id="product-unit"
                type="text"
                value={createProductSchema.unit || ''}
                min={1}
                max={255}
                onChange={(e) => {
                  setCreateProductSchema({ ...createProductSchema, unit: e.target.value || null })
                }}
              />
            </div>

            <div className="flex gap-4 items-center">
              <ToggleSwitch
                checked={createProductSchema.isPublished}
                label="Hiển thị công khai"
                onChange={(checked: boolean) => {
                  setCreateProductSchema({ ...createProductSchema, isPublished: checked })
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

export default CreateProductModal
