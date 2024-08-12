'use client'
import React, { useEffect } from 'react'
import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Select,
  Spinner,
  TextInput,
  Textarea,
  ToggleSwitch,
} from 'flowbite-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ENV } from '@/utils/constant'
import { toast } from 'react-toastify'
import { queryClient } from '@/components/Providers/QueryProvider'
import { Category, Product } from '@prisma/client'
import useAdminProductStore from '../../stores/useAdminProductStore'
import { useShallow } from 'zustand/react/shallow'
import { CreateProductSchema } from '@/app/api/product/schemas/createProductSchema'

const UpdateProductModal = () => {
  const [updatingProductId, isUpdatingProduct, setIsUpdatingProduct, updateProductSchema, setUpdateProductSchema] =
    useAdminProductStore(
      useShallow((state) => [
        state.updatingProductId,
        state.isUpdatingProduct,
        state.setIsUpdatingProduct,
        state.updateProductSchema,
        state.setUpdateProductSchema,
      ]),
    )

  const query1 = useQuery({
    queryKey: ['category'],
    queryFn: async (): Promise<(Category & { _count: { products: number } })[]> => {
      const response = await fetch(`${ENV.NEXT_PUBLIC_API_URL}/category`)
      return (await response.json()).data
    },
  })
  const categoryList = query1.data || []

  const query = useQuery({
    queryKey: ['product', updatingProductId],
    queryFn: async (): Promise<Product> => {
      let response
      if (updatingProductId) response = await fetch(`${ENV.NEXT_PUBLIC_API_URL}/product/${updatingProductId}`)
      return (await response?.json()).data
    },
  })
  const product = query.data

  useEffect(() => {
    if (product) {
      setUpdateProductSchema({
        isPublished: product.isPublished,
        name: product.name,
        status: product.status,
        categoryId: product.categoryId,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        unit: product.unit,
      })
    }
  }, [product, setUpdateProductSchema])

  const updateProduct = useMutation({
    mutationFn: async (product: CreateProductSchema) => {
      const response = await fetch(`${ENV.NEXT_PUBLIC_API_URL}/product/${updatingProductId}`, {
        method: 'PATCH',
        body: JSON.stringify(product),
      })
      return await response.json()
    },
    onSuccess: (res) => {
      if (!res.data) {
        toast.error(res.message)
        if (product) {
          setUpdateProductSchema({
            isPublished: product.isPublished,
            name: product.name,
            status: product.status,
            categoryId: product.categoryId,
            description: product.description,
            price: product.price,
            quantity: product.quantity,
            unit: product.unit,
          })
        }
        return
      }

      toast.success('Cập nhật sản phẩm thành công')
      queryClient.invalidateQueries({ queryKey: ['product'] })
    },
    onError: () => {
      toast.error('Cập nhật sản phẩm thất bại')
    },
  })

  return (
    <Modal
      show={isUpdatingProduct}
      size="md"
      onClose={() => {
        setIsUpdatingProduct(false)
      }}
      popup
    >
      <ModalHeader>Cập nhật sản phẩm</ModalHeader>
      <ModalBody>
        {query.isLoading || updateProduct.isPending ? (
          <Spinner />
        ) : (
          <form
            className="flex max-w-md flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault()
              updateProduct.mutate(updateProductSchema)
            }}
          >
            <div>
              <Label htmlFor="product-category">phân loại*</Label>
              <Select
                id="product-category"
                value={updateProductSchema.categoryId || '0'}
                onChange={(e) => setUpdateProductSchema({ ...updateProductSchema, categoryId: e.target.value })}
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
                value={updateProductSchema.name}
                min={1}
                max={255}
                onChange={(e) => {
                  setUpdateProductSchema({ ...updateProductSchema, name: e.target.value })
                }}
              />
            </div>

            <div>
              <Label htmlFor="product-description">Mô tả</Label>
              <Textarea
                id="product-description"
                rows={4}
                value={updateProductSchema.description || ''}
                onChange={(e) => {
                  setUpdateProductSchema({ ...updateProductSchema, description: e.target.value || null })
                }}
              />
            </div>

            <div>
              <Label htmlFor="product-status">Trạng thái*</Label>
              <Select
                id="product-status"
                value={updateProductSchema.status}
                onChange={(e) => {
                  setUpdateProductSchema({
                    ...updateProductSchema,
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
                value={Number(updateProductSchema.price).toLocaleString()}
                onChange={(e) => {
                  setUpdateProductSchema({ ...updateProductSchema, price: Number(e.target.value) || null })
                }}
              />
            </div>

            <div>
              <Label htmlFor="product-quantity">Số lượng</Label>
              <TextInput
                id="product-quantity"
                type="number"
                value={Number(updateProductSchema.quantity)}
                onChange={(e) => {
                  setUpdateProductSchema({ ...updateProductSchema, quantity: Number(e.target.value) || null })
                }}
              />
            </div>

            <div>
              <Label htmlFor="product-unit">Đơn vị</Label>
              <TextInput
                id="product-unit"
                type="text"
                value={updateProductSchema.unit || ''}
                min={1}
                max={255}
                onChange={(e) => {
                  setUpdateProductSchema({ ...updateProductSchema, unit: e.target.value || null })
                }}
              />
            </div>

            <div className="flex gap-4 items-center">
              <ToggleSwitch
                checked={updateProductSchema.isPublished}
                label="Hiển thị công khai"
                onChange={(checked: boolean) => {
                  setUpdateProductSchema({ ...updateProductSchema, isPublished: checked })
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

export default UpdateProductModal
