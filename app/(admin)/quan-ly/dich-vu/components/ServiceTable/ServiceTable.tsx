'use client'
import React from 'react'
import {
  Button,
  Checkbox,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react'
import { useQuery } from '@tanstack/react-query'
import { ENV } from '@/utils/constant'
import { Service } from '@prisma/client'
import { MdModeEditOutline, MdImage } from 'react-icons/md'
import useAdminServiceStore from '../../stores/useAdminServiceStore'
import { useShallow } from 'zustand/react/shallow'

const ServiceTable = () => {
  const [
    serviceIdList,
    addToServiceIdList,
    removeFromServiceIdList,
    setUpdatingServiceId,
    setIsUpdatingService,
    setIsUpdatingImages,
  ] = useAdminServiceStore(
    useShallow((state) => [
      state.serviceIdList,
      state.addToServiceIdList,
      state.removeFromServiceIdList,
      state.setUpdatingServiceId,
      state.setIsUpdatingService,
      state.setIsUpdatingImages,
      state.serviceNameSearch,
    ]),
  )

  const query = useQuery({
    queryKey: ['service'],
    queryFn: async (): Promise<Service[]> => {
      const response = await fetch(`${ENV.NEXT_PUBLIC_API_URL}/service`)
      return (await response.json()).data
    },
  })
  const serviceList = query.data || []

  return (
    <div className=" max-h-[calc(100vh-300px)] overflow-y-auto overflow-x-auto">
      <Table hoverable>
        <TableHead>
          <TableHeadCell className="p-4">
            <Checkbox
              color="cyan"
              checked={serviceList.length === serviceIdList.length && serviceList.length > 0}
              onChange={(e) => {
                if (e.target.checked) {
                  serviceList.forEach((service) => {
                    addToServiceIdList(service.id)
                  })
                } else {
                  serviceList.forEach((service) => {
                    removeFromServiceIdList(service.id)
                  })
                }
              }}
            />
          </TableHeadCell>
          <TableHeadCell>Tên</TableHeadCell>
          <TableHeadCell>Tên tối giản</TableHeadCell>
          <TableHeadCell>Hiển thị</TableHeadCell>
          <TableHeadCell>Mô tả</TableHeadCell>
          <TableHeadCell>
            <span className="sr-only">Add images</span>
          </TableHeadCell>
          <TableHeadCell>
            <span className="sr-only">Edit</span>
          </TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {query.isLoading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                <Spinner />
              </TableCell>
            </TableRow>
          ) : serviceList.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Không có dữ liệu
              </TableCell>
            </TableRow>
          ) : (
            serviceList.map((service) => (
              <TableRow key={service.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell className="p-4">
                  <Checkbox
                    color="cyan"
                    checked={serviceIdList.includes(service.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        addToServiceIdList(service.id)
                      } else {
                        removeFromServiceIdList(service.id)
                      }
                    }}
                  />
                </TableCell>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.simplifiedName}</TableCell>
                <TableCell>{service.isPublished ? 'Đã hiển thị' : 'Chưa hiển thị'}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell className="p-0">
                  <Button
                    size={'xs'}
                    color="transparent"
                    className="font-medium text-cyan-700 hover:underline dark:text-cyan-500"
                    onClick={() => {
                      setIsUpdatingImages(true)
                      setUpdatingServiceId(service.id)
                    }}
                  >
                    <MdImage className="h-6 w-6" />
                  </Button>
                </TableCell>
                <TableCell className="p-0">
                  <Button
                    size={'xs'}
                    color="transparent"
                    className="font-medium text-cyan-700 hover:underline dark:text-cyan-500"
                    onClick={() => {
                      setIsUpdatingService(true)
                      setUpdatingServiceId(service.id)
                    }}
                  >
                    <MdModeEditOutline className="h-6 w-6" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default ServiceTable
