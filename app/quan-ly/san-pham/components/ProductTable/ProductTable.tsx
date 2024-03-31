'use client'
import React, { useEffect } from 'react'
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
import { MdModeEditOutline } from 'react-icons/md'
import useAdminProductStore from '../../hooks/useAdminProductStore'

const ProductTable = () => {
  const productIdList = useAdminProductStore((state) => state.productIdList)
  const addToProductIdList = useAdminProductStore((state) => state.addToProductIdList)
  const removeFromProductIdList = useAdminProductStore((state) => state.removeFromProductIdList)
  const setUpdatingProductId = useAdminProductStore((state) => state.setUpdatingProductId)
  const setIsUpdatingProduct = useAdminProductStore((state) => state.setIsUpdatingProduct)
  const productNameSearch = useAdminProductStore((state) => state.productNameSearch)

  const query = useQuery({
    queryKey: ['product'],
    queryFn: async (): Promise<Product[]> => {
      const response = await fetch(`${ENV.API_URL}/product?name=${productNameSearch}`)
      return (await response.json()).data
    },
  })
  const productList = query.data || []

  useEffect(() => {
    query.refetch()
  }, [query, productNameSearch])

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
          <TableHeadCell>Tên không dấu</TableHeadCell>
          <TableHeadCell>Trạng thái</TableHeadCell>
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
                <TableCell>{product.isPublished ? 'Đã hiển thị' : 'Chưa hiển thị'}</TableCell>
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
