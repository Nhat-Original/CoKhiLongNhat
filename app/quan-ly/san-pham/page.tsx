import React from 'react'
import CreateProductModal from './components/CreateProductModal'
import ProductTable from './components/ProductTable'
import SearchProductBar from './components/SearchProductBar'
// import UpdateProductModal from './components/UpdateProductModal'
// import DeleteProductModal from './components/DeleteProductModal'

const AdminProductPage = () => {
  return (
    <div>
      <SearchProductBar />
      <div className=" flex gap-4">
        <CreateProductModal />
        {/* <CreateProductModal />
        <UpdateProductModal />
        <DeleteProductModal /> */}
      </div>
      <ProductTable />
    </div>
  )
}

export default AdminProductPage
