'use client'
import React from 'react'
import useProductStore from '../../hooks/useProductStore'
import { TextInput } from 'flowbite-react'
import { useShallow } from 'zustand/react/shallow'

const SearchProductBar = () => {
  const [productNameSearch, setProductNameSearch] = useProductStore(
    useShallow((state) => [state.productNameSearch, state.setProductNameSearch]),
  )

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
