'use client'
import React from 'react'
import { Checkbox, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react'
import { useQuery } from '@tanstack/react-query'
import { ENV } from '@/utils/constant'
import { Category } from '@prisma/client'
import { MdModeEditOutline } from 'react-icons/md'
import useAdminCategoryStore from '../../hooks/useAdminCategoryStore'

const CategoryTable = () => {
  const categoryIdList = useAdminCategoryStore((state) => state.categoryIdList)
  const addCategoryId = useAdminCategoryStore((state) => state.addCategoryId)
  const removeCategoryId = useAdminCategoryStore((state) => state.removeCategoryId)

  const categoryList = useQuery({
    queryKey: ['category'],
    queryFn: async (): Promise<Category[]> => {
      const response = await fetch(`${ENV.API_URL}category`)
      const objectResponse = await response.json()
      return objectResponse.data
    },
  })

  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <TableHead>
          <TableHeadCell className="p-4">
            <Checkbox
              color="cyan"
              checked={categoryList.data?.length === categoryIdList.length}
              onChange={(e) => {
                if (e.target.checked) {
                  categoryList.data?.forEach((category) => {
                    addCategoryId(category.id)
                  })
                } else {
                  categoryList.data?.forEach((category) => {
                    removeCategoryId(category.id)
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
          {categoryList.data?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center p-4">
                Không có dữ liệu
              </TableCell>
            </TableRow>
          ) : (
            categoryList.data?.map((category) => (
              <TableRow key={category.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell className="p-4">
                  <Checkbox
                    color="cyan"
                    checked={categoryIdList.includes(category.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        addCategoryId(category.id)
                      } else {
                        removeCategoryId(category.id)
                      }
                    }}
                  />
                </TableCell>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.simplifiedName}</TableCell>
                <TableCell>{category.isPublished ? 'Đã hiển thị' : 'Chưa hiển thị'}</TableCell>
                <TableCell>
                  <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                    <MdModeEditOutline className="h-6 w-6" />
                  </a>
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
