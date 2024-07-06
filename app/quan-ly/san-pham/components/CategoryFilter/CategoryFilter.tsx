'use client'
import React from 'react'
import { Select, Spinner } from 'flowbite-react'
import { Category } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { ENV } from '@/utils/constant'
import useAdminProductStore from '../../hooks/useAdminProductStore'

const CategoryFilter = () => {
  const productCategorySearch = useAdminProductStore((state) => state.productCategorySearch)
  const setProductCategorySearch = useAdminProductStore((state) => state.setProductCategorySearch)

  const query = useQuery({
    queryKey: ['category'],
    queryFn: async (): Promise<(Category & { _count: { products: number } })[]> => {
      const response = await fetch(`${ENV.API_URL}/category`)
      return (await response.json()).data
    },
  })
  const categoryList = query.data || []

  return (
    <Select onChange={(e) => setProductCategorySearch(e.target.value)} defaultValue={productCategorySearch}>
      {query.isLoading ? (
        <option>
          <Spinner />
        </option>
      ) : categoryList.length === 0 ? (
        <>Không có dữ liệu</>
      ) : (
        <>
          <option className="font-semibold" key="*" value="*">
            Tất cả
          </option>
          <option className="font-semibold" key="0" value="0">
            Không phân loại
          </option>
          {categoryList.map((category) => (
            <option key={category.id} value={category.simplifiedName}>
              {category.name}
            </option>
          ))}
        </>
      )}
    </Select>
  )
}

export default CategoryFilter
