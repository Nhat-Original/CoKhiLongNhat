import { Category, Product, ProductImage } from '@prisma/client'
import { create } from 'zustand'

type ProductDetailStore = {
  product: (Product & { productImages: ProductImage[]; category: Category }) | null
  productImages: ProductImage[]
  previewImageIndex: number
  isPreviewing: boolean

  setProduct: (product: Product & { productImages: ProductImage[]; category: Category }) => void
  setProductImages: (productImages: ProductImage[]) => void
  setPreviewImageIndex: (index: number) => void
  setIsPreviewing: (isPreviewing: boolean) => void
}

const useProductDetailStore = create<ProductDetailStore>((set) => ({
  product: null,
  productImages: [],
  previewImageIndex: 0,
  isPreviewing: false,

  setProduct: (product) => set({ product }),
  setProductImages: (productImages) => set({ productImages }),
  setPreviewImageIndex: (previewImageIndex) => set({ previewImageIndex }),
  setIsPreviewing: (isPreviewing) => set({ isPreviewing }),
}))

export default useProductDetailStore
