import { create } from 'zustand'

type CategorySchema = {
  name: string
  description: string | null
  isPublished: boolean
}

type AdminCategoryStore = {
  createCategorySchema: CategorySchema
  updateCategorySchema: CategorySchema
  categoryIdList: string[]
  addToCategoryIdList: (categoryId: string) => void
  removeFromCategoryIdList: (categoryId: string) => void
  clearCategoryIdList: () => void
  setCreateCategorySchema: (schema: CategorySchema) => void
  clearCreateCategorySchema: () => void
  isUpdatingCategory: boolean
  setIsUpdatingCategory: (isUpdating: boolean) => void
  updatingCategoryId: string
  setUpdatingCategoryId: (id: string) => void
  setUpdateCategorySchema: (schema: CategorySchema) => void
  clearUpdateCategorySchema: () => void
}

const initialCategorySchema: CategorySchema = {
  name: '',
  description: null,
  isPublished: false,
}

const useAdminCategoryStore = create<AdminCategoryStore>((set) => ({
  createCategorySchema: initialCategorySchema,
  updateCategorySchema: initialCategorySchema,
  categoryIdList: [],
  addToCategoryIdList: (categoryId: string) => {
    set((state) => {
      if (state.categoryIdList.includes(categoryId)) {
        return state
      }
      return { categoryIdList: [...state.categoryIdList, categoryId] }
    })
  },
  removeFromCategoryIdList: (categoryId: string) => {
    set((state) => ({ categoryIdList: state.categoryIdList.filter((id) => id !== categoryId) }))
  },
  clearCategoryIdList: () => {
    set({ categoryIdList: [] })
  },
  setCreateCategorySchema: (schema: CategorySchema) => {
    set({ createCategorySchema: schema })
  },
  clearCreateCategorySchema: () => {
    set({ createCategorySchema: initialCategorySchema })
  },
  isUpdatingCategory: false,
  setIsUpdatingCategory: (isUpdating: boolean) => {
    set({ isUpdatingCategory: isUpdating })
  },
  updatingCategoryId: '',
  setUpdatingCategoryId: (id: string) => {
    set({ updatingCategoryId: id })
  },
  setUpdateCategorySchema: (schema: CategorySchema) => {
    set({ updateCategorySchema: schema })
  },
  clearUpdateCategorySchema: () => {
    set({ updateCategorySchema: initialCategorySchema })
  },
}))

export default useAdminCategoryStore
