'use client'
import React from 'react'
import useAdminServiceStore from '../../stores/useAdminServiceStore'
import { TextInput } from 'flowbite-react'

const SearchServiceBar = () => {
  const serviceNameSearch = useAdminServiceStore((state) => state.serviceNameSearch)
  const setServiceNameSearch = useAdminServiceStore((state) => state.setServiceNameSearch)

  return (
    <div>
      <TextInput
        width={200}
        type="text"
        sizing="sm"
        placeholder="Tìm kiếm tên dịch vụ"
        value={serviceNameSearch}
        onChange={(e) => {
          setServiceNameSearch(e.target.value)
        }}
      />
    </div>
  )
}

export default SearchServiceBar
