import { create } from 'zustand'
import type { CreateProductSchema as ProductSchema } from '@/app/api/product/schemas/createProductSchema'

type AdminProductStore = {
  productIdList: string[]
  productNameSearch: string
  productCategorySearch: string
  createProductSchema: ProductSchema
  isUpdatingProduct: boolean
  isUpdatingImages: boolean
  updatingProductId: string
  updateProductSchema: ProductSchema
  updateProductImagesSchema: { productImages: string[] }

  addToProductIdList: (productId: string) => void
  removeFromProductIdList: (productId: string) => void
  clearProductIdList: () => void
  setProductNameSearch: (name: string) => void
  setProductCategorySearch: (category: string) => void
  setCreateProductSchema: (schema: ProductSchema) => void
  clearCreateProductSchema: () => void
  setIsUpdatingProduct: (isUpdating: boolean) => void
  setIsUpdatingImages: (isUpdating: boolean) => void
  setUpdatingProductId: (id: string) => void
  setUpdateProductSchema: (schema: ProductSchema) => void
  clearUpdateProductSchema: () => void
  setUpdateProductImagesSchema: (schema: { productImages: string[] }) => void
  clearUpdateProductImagesSchema: () => void
}

const initialProductSchema: ProductSchema = {
  name: '',
  description: null,
  status: 'AVAILABLE',
  price: null,
  quantity: null,
  unit: null,
  isPublished: false,
  productImages: null,
  categoryId: '0',
}

const useAdminProductStore = create<AdminProductStore>((set) => ({
  productIdList: [],
  productNameSearch: '',
  productCategorySearch: '*',
  createProductSchema: initialProductSchema,
  isUpdatingProduct: false,
  isUpdatingImages: false,
  updatingProductId: '',
  updateProductSchema: initialProductSchema,
  updateProductImagesSchema: { productImages: [] },

  addToProductIdList: (productId: string) => {
    set((state) => {
      if (state.productIdList.includes(productId)) {
        return state
      }
      return { productIdList: [...state.productIdList, productId] }
    })
  },
  removeFromProductIdList: (productId: string) => {
    set((state) => ({ productIdList: state.productIdList.filter((id) => id !== productId) }))
  },
  clearProductIdList: () => {
    set({ productIdList: [] })
  },
  setProductNameSearch: (name: string) => {
    set({ productNameSearch: name })
  },
  setProductCategorySearch: (category: string) => {
    set({ productCategorySearch: category })
  },
  setCreateProductSchema: (schema: ProductSchema) => {
    set({ createProductSchema: schema })
  },
  clearCreateProductSchema: () => {
    set({ createProductSchema: initialProductSchema })
  },
  setIsUpdatingProduct: (isUpdating: boolean) => {
    set({ isUpdatingProduct: isUpdating })
  },
  setIsUpdatingImages: (isUpdating: boolean) => {
    set({ isUpdatingImages: isUpdating })
  },
  setUpdatingProductId: (id: string) => {
    set({ updatingProductId: id })
  },
  setUpdateProductSchema: (schema: ProductSchema) => {
    set({ updateProductSchema: schema })
  },
  clearUpdateProductSchema: () => {
    set({ updateProductSchema: initialProductSchema })
  },
  setUpdateProductImagesSchema: (schema: { productImages: string[] }) => {
    set({ updateProductImagesSchema: schema })
  },
  clearUpdateProductImagesSchema: () => {
    set({ updateProductImagesSchema: { productImages: [] } })
  },
}))

export default useAdminProductStore
