import { create } from 'zustand'
import type { CreateServiceSchema as ServiceSchema } from '@/app/api/service/schemas/createServiceSchema'

type AdminServiceStore = {
  serviceIdList: string[]
  serviceNameSearch: string
  createServiceSchema: ServiceSchema
  isUpdatingService: boolean
  isUpdatingImages: boolean
  updatingServiceId: string
  updateServiceSchema: ServiceSchema
  updateServiceImagesSchema: { serviceImages: string[] }

  addToServiceIdList: (serviceId: string) => void
  removeFromServiceIdList: (serviceId: string) => void
  clearServiceIdList: () => void
  setServiceNameSearch: (name: string) => void
  setCreateServiceSchema: (schema: ServiceSchema) => void
  clearCreateServiceSchema: () => void
  setIsUpdatingService: (isUpdating: boolean) => void
  setIsUpdatingImages: (isUpdating: boolean) => void
  setUpdatingServiceId: (id: string) => void
  setUpdateServiceSchema: (schema: ServiceSchema) => void
  clearUpdateServiceSchema: () => void
  setUpdateServiceImagesSchema: (schema: { serviceImages: string[] }) => void
  clearUpdateServiceImagesSchema: () => void
}

const initialServiceSchema: ServiceSchema = {
  name: '',
  description: null,
  isPublished: false,
  serviceImages: null,
}

const useAdminServiceStore = create<AdminServiceStore>((set) => ({
  serviceIdList: [],
  serviceNameSearch: '',
  createServiceSchema: initialServiceSchema,
  isUpdatingService: false,
  isUpdatingImages: false,
  updatingServiceId: '',
  updateServiceSchema: initialServiceSchema,
  updateServiceImagesSchema: { serviceImages: [] },

  addToServiceIdList: (serviceId: string) => {
    set((state) => {
      if (state.serviceIdList.includes(serviceId)) {
        return state
      }
      return { serviceIdList: [...state.serviceIdList, serviceId] }
    })
  },
  removeFromServiceIdList: (serviceId: string) => {
    set((state) => ({ serviceIdList: state.serviceIdList.filter((id) => id !== serviceId) }))
  },
  clearServiceIdList: () => {
    set({ serviceIdList: [] })
  },
  setServiceNameSearch: (name: string) => {
    set({ serviceNameSearch: name })
  },
  setCreateServiceSchema: (schema: ServiceSchema) => {
    set({ createServiceSchema: schema })
  },
  clearCreateServiceSchema: () => {
    set({ createServiceSchema: initialServiceSchema })
  },
  setIsUpdatingService: (isUpdating: boolean) => {
    set({ isUpdatingService: isUpdating })
  },
  setIsUpdatingImages: (isUpdating: boolean) => {
    set({ isUpdatingImages: isUpdating })
  },
  setUpdatingServiceId: (id: string) => {
    set({ updatingServiceId: id })
  },
  setUpdateServiceSchema: (schema: ServiceSchema) => {
    set({ updateServiceSchema: schema })
  },
  clearUpdateServiceSchema: () => {
    set({ updateServiceSchema: initialServiceSchema })
  },
  setUpdateServiceImagesSchema: (schema: { serviceImages: string[] }) => {
    set({ updateServiceImagesSchema: schema })
  },
  clearUpdateServiceImagesSchema: () => {
    set({ updateServiceImagesSchema: { serviceImages: [] } })
  },
}))

export default useAdminServiceStore
