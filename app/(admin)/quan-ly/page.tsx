'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const AdminPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace('/quan-ly/dich-vu')
  }, [router])

  return <></>
}

export default AdminPage
