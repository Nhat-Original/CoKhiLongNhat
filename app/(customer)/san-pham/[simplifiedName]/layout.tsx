import { ENV } from '@/utils/constant'
import { Metadata } from 'next'

const generateMetadata = async ({ params }: { params: { simplifiedName: string } }): Promise<Metadata> => {
  const response = await fetch(`${ENV.NEXT_PUBLIC_API_URL}/product/simplified-name/${params.simplifiedName}`)
  if (!response.ok) throw new Error()
  const product = (await response.json()).data

  if (!product) {
    return {
      title: 'Không tìm thấy sản phẩm | Cơ Khí Long Nhật',
      description: 'Không tìm thấy sản phẩm',
    }
  }

  return {
    title: `${product?.name} | Cơ Khí Long Nhật`,
    description: `${product?.name} - ${product?.description || 'Chưa có mô tả sản phẩm'}`,
  }
}

const ProductDetailLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export default ProductDetailLayout
export { generateMetadata }
