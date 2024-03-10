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
import { Category } from '@prisma/client'
import { MdModeEditOutline } from 'react-icons/md'
import useAdminCategoryStore from '../../hooks/useAdminCategoryStore'

const CategoryTable = () => {
  const categoryIdList = useAdminCategoryStore((state) => state.categoryIdList)
  const addToCategoryIdList = useAdminCategoryStore((state) => state.addToCategoryIdList)
  const removeFromCategoryIdList = useAdminCategoryStore((state) => state.removeFromCategoryIdList)
  const setUpdatingCategoryId = useAdminCategoryStore((state) => state.setUpdatingCategoryId)
  const setIsUpdatingCategory = useAdminCategoryStore((state) => state.setIsUpdatingCategory)

  const query = useQuery({
    queryKey: ['category'],
    queryFn: async (): Promise<(Category & { _count: { products: number } })[]> => {
      const response = await fetch(`${ENV.API_URL}/category`)
      return (await response.json()).data
    },
  })
  const categoryList = query.data || []

  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <TableHead>
          <TableHeadCell className="p-4">
            <Checkbox
              color="cyan"
              checked={categoryList.length === categoryIdList.length && categoryList.length > 0}
              onChange={(e) => {
                if (e.target.checked) {
                  categoryList.forEach((category) => {
                    addToCategoryIdList(category.id)
                  })
                } else {
                  categoryList.forEach((category) => {
                    removeFromCategoryIdList(category.id)
                  })
                }
              }}
            />
          </TableHeadCell>
          <TableHeadCell>Id</TableHeadCell>
          <TableHeadCell>Tên</TableHeadCell>
          <TableHeadCell>Tên không dấu</TableHeadCell>
          <TableHeadCell>Trạng thái</TableHeadCell>
          <TableHeadCell>Số sản phẩm</TableHeadCell>
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
          ) : categoryList.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                Không có dữ liệu
              </TableCell>
            </TableRow>
          ) : (
            categoryList.map((category) => (
              <TableRow key={category.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell className="p-4">
                  <Checkbox
                    color="cyan"
                    checked={categoryIdList.includes(category.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        addToCategoryIdList(category.id)
                      } else {
                        removeFromCategoryIdList(category.id)
                      }
                    }}
                  />
                </TableCell>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.simplifiedName}</TableCell>
                <TableCell>{category.isPublished ? 'Đã hiển thị' : 'Chưa hiển thị'}</TableCell>
                <TableCell>{category._count.products}</TableCell>
                <TableCell>
                  <Button
                    size={'xs'}
                    color="transparent"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    onClick={() => {
                      setIsUpdatingCategory(true)
                      setUpdatingCategoryId(category.id)
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

export default CategoryTable
