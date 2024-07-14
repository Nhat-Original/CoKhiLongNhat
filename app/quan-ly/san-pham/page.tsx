import React from 'react'
import CreateProductModal from './components/CreateProductModal'
import ProductTable from './components/ProductTable'
import SearchProductBar from './components/SearchProductBar'
import CategoryFilter from './components/CategoryFilter'
import DeleteProductModal from './components/DeleteProductModal'
import UpdateProductModal from './components/UpdateProductModal'
import UpdateProductImageModal from './components/UpdateProductImageModal'

const AdminProductPage = () => {
  return (
    <div>
      <div className="flex items-center gap-4">
        <SearchProductBar />
        <CategoryFilter />
        <CreateProductModal />
        <UpdateProductModal />
        <UpdateProductImageModal />
        <DeleteProductModal />
      </div>
      <ProductTable />
    </div>
  )
}

export default AdminProductPage
