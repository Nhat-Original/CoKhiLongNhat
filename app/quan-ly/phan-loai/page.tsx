import React from 'react'
import CreateCategoryModal from './components/CreateCategoryModal'
import CategoryTable from './components/CategoryTable'
import DeleteCategoryModal from './components/DeleteCategoryModal'

const AdminCategoryPage = () => {
  return (
    <div>
      <div className=" flex gap-4">
        <CreateCategoryModal />
        <DeleteCategoryModal />
      </div>
      <CategoryTable />
    </div>
  )
}

export default AdminCategoryPage
