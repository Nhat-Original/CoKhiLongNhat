import { create } from 'zustand'

type AdminCategoryStore = {
  categoryIdList: string[]
  addCategoryId: (categoryId: string) => void
  removeCategoryId: (categoryId: string) => void
}
const useAdminCategoryStore = create<AdminCategoryStore>((set) => ({
  categoryIdList: [],
  addCategoryId: (categoryId: string) => {
    set((state) => {
      if (state.categoryIdList.includes(categoryId)) {
        return state
      }
      return { categoryIdList: [...state.categoryIdList, categoryId] }
    })
  },
  removeCategoryId: (categoryId: string) => {
    set((state) => ({ categoryIdList: state.categoryIdList.filter((id) => id !== categoryId) }))
  },
}))

export default useAdminCategoryStore
