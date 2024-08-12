import React from 'react'
import CreateServiceModal from './components/CreateServiceModal'
import UpdateServiceModal from './components/UpdateServiceModal'
import UpdateServiceImageModal from './components/UpdateServiceImageModal'
import DeleteServiceModal from './components/DeleteServiceModal'
import ServiceTable from './components/ServiceTable'
// import SearchServiceBar from './components/SearchServiceBar'

const AdminServicePage = () => {
  return (
    <div>
      <div className="flex items-center gap-4">
        {/* <SearchServiceBar /> */}
        <CreateServiceModal />
        <UpdateServiceModal />
        <UpdateServiceImageModal />
        <DeleteServiceModal />
      </div>
      <ServiceTable />
    </div>
  )
}

export default AdminServicePage
