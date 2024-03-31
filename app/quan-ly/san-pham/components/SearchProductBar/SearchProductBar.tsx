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
        type="text"
        sizing="sm"
        placeholder="tìm kiếm tên sản phẩm"
        value={productNameSearch}
        onChange={(e) => {
          setProductNameSearch(e.target.value)
        }}
      />
    </div>
  )
}

export default SearchProductBar
