'use client'
import React from 'react'
import { Select, Spinner } from 'flowbite-react'
import { Category } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { ENV } from '@/utils/constant'
import useProductStore from '../../stores/useProductStore'

const CategoryFilter = () => {
  const [productCategorySearch, setProductCategorySearch] = useProductStore((state) => [
    state.productCategorySearch,
    state.setProductCategorySearch,
  ])

  const query = useQuery({
    queryKey: ['category'],
    queryFn: async (): Promise<(Category & { _count: { products: number } })[]> => {
      const response = await fetch(`${ENV.API_URL}/category`)
      return (await response.json()).data
    },
  })
  const categoryList = query.data || []

  return query.isLoading ? (
    <Spinner />
  ) : (
    <Select sizing="sm" onChange={(e) => setProductCategorySearch(e.target.value)} defaultValue={productCategorySearch}>
      <option className="font-semibold" key="*" value="*">
        Tất cả phân loại
      </option>
      <option className="font-semibold" key="0" value="0">
        Không phân loại
      </option>
      {categoryList.map((category) => (
        <option key={category.id} value={category.simplifiedName}>
          {category.name}
        </option>
      ))}
    </Select>
  )
}

export default CategoryFilter
