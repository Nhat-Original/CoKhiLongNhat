import { PRODUCT_STATUS } from '@prisma/client'
import { create } from 'zustand'

type ProductSchema = {
  name: string
  description: string | null
  status: PRODUCT_STATUS | null
  price: number | null
  quantity: number | null
  unit: string | null
  isPublished: boolean
  productImages: string[]
}

type AdminProductStore = {
  productIdList: string[]
  addToProductIdList: (ProductId: string) => void
  removeFromProductIdList: (ProductId: string) => void
  clearProductIdList: () => void
  productNameSearch: string
  setProductNameSearch: (name: string) => void
  createProductSchema: ProductSchema
  setCreateProductSchema: (schema: ProductSchema) => void
  clearCreateProductSchema: () => void
  isUpdatingProduct: boolean
  setIsUpdatingProduct: (isUpdating: boolean) => void
  updatingProductId: string
  setUpdatingProductId: (id: string) => void
  updateProductSchema: ProductSchema
  setUpdateProductSchema: (schema: ProductSchema) => void
  clearUpdateProductSchema: () => void
}

const initialProductSchema: ProductSchema = {
  name: '',
  description: '',
  status: 'AVAILABLE',
  price: 0,
  quantity: 0,
  unit: '',
  isPublished: false,
  productImages: [],
}

const useAdminProductStore = create<AdminProductStore>((set) => ({
  productIdList: [],
  addToProductIdList: (ProductId: string) => {
    set((state) => {
      if (state.productIdList.includes(ProductId)) {
        return state
      }
      return { productIdList: [...state.productIdList, ProductId] }
    })
  },
  removeFromProductIdList: (ProductId: string) => {
    set((state) => ({ productIdList: state.productIdList.filter((id) => id !== ProductId) }))
  },
  clearProductIdList: () => {
    set({ productIdList: [] })
  },
  productNameSearch: '',
  setProductNameSearch: (name: string) => {
    set({ productNameSearch: name })
  },
  createProductSchema: initialProductSchema,
  setCreateProductSchema: (schema: ProductSchema) => {
    set({ createProductSchema: schema })
  },
  clearCreateProductSchema: () => {
    set({ createProductSchema: initialProductSchema })
  },
  isUpdatingProduct: false,
  setIsUpdatingProduct: (isUpdating: boolean) => {
    set({ isUpdatingProduct: isUpdating })
  },
  updatingProductId: '',
  setUpdatingProductId: (id: string) => {
    set({ updatingProductId: id })
  },
  updateProductSchema: initialProductSchema,
  setUpdateProductSchema: (schema: ProductSchema) => {
    set({ updateProductSchema: schema })
  },
  clearUpdateProductSchema: () => {
    set({ updateProductSchema: initialProductSchema })
  },
}))

export default useAdminProductStore
