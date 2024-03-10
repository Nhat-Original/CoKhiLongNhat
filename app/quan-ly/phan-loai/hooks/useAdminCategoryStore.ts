import { create } from 'zustand'

type CreateCategorySchema = {
  name: string
  description: string | null
  isPublished: boolean
}
type UpdateCategorySchema = {
  name: string
  description: string | null
  isPublished: boolean
}

type AdminCategoryStore = {
  createCategorySchema: CreateCategorySchema
  updateCategorySchema: UpdateCategorySchema
  categoryIdList: string[]
  addToCategoryIdList: (categoryId: string) => void
  removeFromCategoryIdList: (categoryId: string) => void
  clearCategoryIdList: () => void
  setCreateCategorySchema: (schema: CreateCategorySchema) => void
  clearCreateCategorySchema: () => void
  isUpdatingCategory: boolean
  setIsUpdatingCategory: (isUpdating: boolean) => void
  updatingCategoryId: string
  setUpdatingCategoryId: (id: string) => void
  setUpdateCategorySchema: (schema: UpdateCategorySchema) => void
  clearUpdateCategorySchema: () => void
}

const useAdminCategoryStore = create<AdminCategoryStore>((set) => ({
  createCategorySchema: {
    name: '',
    description: '',
    isPublished: false,
  },
  updateCategorySchema: {
    name: '',
    description: '',
    isPublished: false,
  },
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
  setCreateCategorySchema: (schema: CreateCategorySchema) => {
    set({ createCategorySchema: schema })
  },
  clearCreateCategorySchema: () => {
    set({ createCategorySchema: { name: '', description: '', isPublished: false } })
  },
  isUpdatingCategory: false,
  setIsUpdatingCategory: (isUpdating: boolean) => {
    set({ isUpdatingCategory: isUpdating })
  },
  updatingCategoryId: '',
  setUpdatingCategoryId: (id: string) => {
    set({ updatingCategoryId: id })
  },
  setUpdateCategorySchema: (schema: UpdateCategorySchema) => {
    set({ updateCategorySchema: schema })
  },
  clearUpdateCategorySchema: () => {
    set({ updateCategorySchema: { name: '', description: '', isPublished: false } })
  },
}))

export default useAdminCategoryStore
