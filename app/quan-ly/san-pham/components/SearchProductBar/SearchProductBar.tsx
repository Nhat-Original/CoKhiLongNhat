'use client'
import React from 'react'
import useAdminProductStore from '../../hooks/useAdminProductStore'
import { TextInput } from 'flowbite-react'

const SearchProductBar = () => {
  const productNameSearch = useAdminProductStore((state) => state.productNameSearch)
  const setProductNameSearch = useAdminProductStore((state) => state.setProductNameSearch)

  return (
    <div>
      <TextInput
        width={200}
        type="text"
        sizing="sm"
        placeholder="Tìm kiếm tên sản phẩm"
        value={productNameSearch}
        onChange={(e) => {
          setProductNameSearch(e.target.value)
        }}
      />
    </div>
  )
}

export default SearchProductBar
