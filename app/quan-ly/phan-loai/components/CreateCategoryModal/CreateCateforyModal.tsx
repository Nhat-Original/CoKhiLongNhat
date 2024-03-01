'use client'
import React from 'react'
import { Button, Modal, ModalBody, ModalHeader } from 'flowbite-react'
import { useState } from 'react'

const CreateCateforyModal = () => {
  const [openModal, setOpenModal] = useState(false)

  function onCloseModal() {
    setOpenModal(false)
  }

  return (
    <>
      <Button color="info" onClick={() => setOpenModal(true)}>
        Tạo phân loại
      </Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <ModalHeader />
        <ModalBody></ModalBody>
      </Modal>
    </>
  )
}

export default CreateCateforyModal
