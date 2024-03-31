'use client'
import React from 'react'
import { Button, Label, Modal, ModalBody, ModalHeader, Select, TextInput, Textarea, ToggleSwitch } from 'flowbite-react'
import { useState } from 'react'
import useAdminProductStore from '../../hooks/useAdminProductStore'
import { useMutation } from '@tanstack/react-query'
import { ENV } from '@/utils/constant'
import { toast } from 'react-toastify'
import { queryClient } from '@/components/Providers/QueryProvider'
import { PRODUCT_STATUS } from '@prisma/client'

const CreateProductModal = () => {
  const [openModal, setOpenModal] = useState(false)
  const createProductSchema = useAdminProductStore((state) => state.createProductSchema)
  const setCreateProductSchema = useAdminProductStore((state) => state.setCreateProductSchema)
  const clearCreateProductSchema = useAdminProductStore((state) => state.clearCreateProductSchema)

  const createProduct = useMutation({
    mutationFn: async (product: { name: string; description: string | null; isPublished: boolean }) => {
      const response = await fetch(`${ENV.API_URL}/product`, {
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
              <div className="mb-2 block">
                <Label htmlFor="product-name" value="Tên*" />
              </div>
              <TextInput
                id="product-name"
                type="text"
                placeholder="..."
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
              <div className="mb-2 block">
                <Label htmlFor="product-description" value="Mô tả" />
              </div>
              <Textarea
                id="product-description"
                placeholder="..."
                rows={4}
                value={createProductSchema.description || ''}
                onChange={(e) => {
                  setCreateProductSchema({ ...createProductSchema, description: e.target.value })
                }}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="product-status" value="Trạng thái*" />
              </div>
              <Select
                id="product-status"
                required
                value={createProductSchema.status!}
                onChange={(e) => {
                  setCreateProductSchema({ ...createProductSchema, status: e.target.value as PRODUCT_STATUS })
                }}
              >
                <option
                  selected={createProductSchema.status === PRODUCT_STATUS.AVAILABLE}
                  value={PRODUCT_STATUS.AVAILABLE}
                >
                  Còn hàng
                </option>
                <option
                  selected={createProductSchema.status === PRODUCT_STATUS.UNAVAILABLE}
                  value={PRODUCT_STATUS.UNAVAILABLE}
                >
                  Hết hàng
                </option>
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="product-price" value="Giá" />
              </div>
              <TextInput
                id="product-price"
                type="number"
                placeholder="0"
                required
                value={createProductSchema.price!}
                min={0}
                onChange={(e) => {
                  setCreateProductSchema({ ...createProductSchema, price: +e.target.value })
                }}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="product-quantity" value="Số lượng" />
              </div>
              <TextInput
                id="product-quantity"
                type="number"
                placeholder="0"
                required
                value={createProductSchema.quantity!}
                min={0}
                onChange={(e) => {
                  setCreateProductSchema({ ...createProductSchema, quantity: +e.target.value })
                }}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="product-unit" value="Đơn vị" />
              </div>
              <TextInput
                id="product-unit"
                type="text"
                placeholder="..."
                required
                value={createProductSchema.name}
                min={1}
                max={255}
                onChange={(e) => {
                  setCreateProductSchema({ ...createProductSchema, name: e.target.value })
                }}
              />
            </div>
            <ToggleSwitch
              checked={createProductSchema.isPublished}
              label="Hiển thị công khai"
              onChange={(checked: boolean) => {
                setCreateProductSchema({ ...createProductSchema, isPublished: checked })
              }}
            />
            <Button type="submit">Submit</Button>
          </form>
        </ModalBody>
      </Modal>
    </>
  )
}

export default CreateProductModal
