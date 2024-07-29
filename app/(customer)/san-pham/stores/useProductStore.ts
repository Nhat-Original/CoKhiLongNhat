import { create } from 'zustand'

type ProductStore = {
  productCount: number
  productNameSearch: string
  productCategorySearch: string

  setProductCount: (productCount: number) => void
  setProductNameSearch: (productNameSearch: string) => void
  setProductCategorySearch: (productCategorySearch: string) => void
}

const useProductStore = create<ProductStore>((set) => ({
  productCount: 0,
  productNameSearch: '',
  productCategorySearch: '*',

  setProductCount: (productCount) => set({ productCount }),
  setProductNameSearch: (productNameSearch) => set({ productNameSearch }),
  setProductCategorySearch: (productCategorySearch) => set({ productCategorySearch }),
}))

export default useProductStore
