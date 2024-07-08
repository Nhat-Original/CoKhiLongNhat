'use client'
import React from 'react'
import {
  Button,
  Checkbox,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react'
import { useQuery } from '@tanstack/react-query'
import { ENV } from '@/utils/constant'
import { Product } from '@prisma/client'
import { MdModeEditOutline, MdImage } from 'react-icons/md'
import useAdminProductStore from '../../hooks/useAdminProductStore'
import { useShallow } from 'zustand/react/shallow'

const ProductTable = () => {
  const [
    productIdList,
    addToProductIdList,
    removeFromProductIdList,
    setUpdatingProductId,
    setIsUpdatingProduct,
    setIsUpdatingImages,
    productNameSearch,
    productCategorySearch,
  ] = useAdminProductStore(
    useShallow((state) => [
      state.productIdList,
      state.addToProductIdList,
      state.removeFromProductIdList,
      state.setUpdatingProductId,
      state.setIsUpdatingProduct,
      state.setIsUpdatingImages,
      state.productNameSearch,
      state.productCategorySearch,
    ]),
  )

  const query = useQuery({
    queryKey: ['product', productNameSearch, productCategorySearch],
    queryFn: async (): Promise<
      (Product & {
        category: {
          name: string
        }
      })[]
    > => {
      const response = await fetch(`${ENV.API_URL}/product?name=${productNameSearch}&category=${productCategorySearch}`)
      return (await response.json()).data
    },
  })
  const productList = query.data || []

  return (
    <div className=" max-h-[calc(100vh-300px)] overflow-y-auto overflow-x-auto">
      <Table hoverable>
        <TableHead>
          <TableHeadCell className="p-4">
            <Checkbox
              color="cyan"
              checked={productList.length === productIdList.length && productList.length > 0}
              onChange={(e) => {
                if (e.target.checked) {
                  productList.forEach((product) => {
                    addToProductIdList(product.id)
                  })
                } else {
                  productList.forEach((product) => {
                    removeFromProductIdList(product.id)
                  })
                }
              }}
            />
          </TableHeadCell>
          <TableHeadCell>Id</TableHeadCell>
          <TableHeadCell>Tên</TableHeadCell>
          <TableHeadCell>Tên tối giản</TableHeadCell>
          <TableHeadCell>Phân loại</TableHeadCell>
          <TableHeadCell>Giá tiền</TableHeadCell>
          <TableHeadCell>Hiển thị</TableHeadCell>
          <TableHeadCell>
            <span className="sr-only">Add images</span>
          </TableHeadCell>
          <TableHeadCell>
            <span className="sr-only">Edit</span>
          </TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {query.isLoading ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                <Spinner />
              </TableCell>
            </TableRow>
          ) : productList.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                Không có dữ liệu
              </TableCell>
            </TableRow>
          ) : (
            productList.map((product) => (
              <TableRow key={product.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell className="p-4">
                  <Checkbox
                    color="cyan"
                    checked={productIdList.includes(product.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        addToProductIdList(product.id)
                      } else {
                        removeFromProductIdList(product.id)
                      }
                    }}
                  />
                </TableCell>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.simplifiedName}</TableCell>
                <TableCell>{product.category?.name}</TableCell>
                <TableCell>
                  {(() => {
                    if (!product.price) return 'Chưa có giá tiền'
                    else if (product.price && product.quantity && product.unit)
                      return `${product.price.toLocaleString()}đ / ${product.quantity} ${product.unit}`
                    else return `${product.price.toLocaleString()}đ`
                  })()}
                </TableCell>
                <TableCell>{product.isPublished ? 'Đã hiển thị' : 'Chưa hiển thị'}</TableCell>
                <TableCell>
                  <Button
                    size={'xs'}
                    color="transparent"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    onClick={() => {
                      setIsUpdatingImages(true)
                      setUpdatingProductId(product.id)
                    }}
                  >
                    <MdImage className="h-6 w-6" />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    size={'xs'}
                    color="transparent"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    onClick={() => {
                      setIsUpdatingProduct(true)
                      setUpdatingProductId(product.id)
                    }}
                  >
                    <MdModeEditOutline className="h-6 w-6" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default ProductTable
