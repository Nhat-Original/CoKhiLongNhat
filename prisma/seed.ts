import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  if (process.env.NODE_ENV !== 'development') {
    throw new Error('Seeding is only allowed in development environment')
  }

  await prisma.productImage.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  for (let i = 0; i < 5; i++) {
    await prisma.category.create({
      data: {
        name: `Category ${i}`,
        simplifiedName: `category-${i}`,
        isPublished: true,
      },
    })
  }
  for (let i = 5; i < 10; i++) {
    await prisma.category.create({
      data: {
        name: `Category ${i}`,
        simplifiedName: `category-${i}`,
        isPublished: false,
      },
    })
  }

  const publishedCategories = await prisma.category.findMany({
    where: {
      isPublished: true,
    },
    select: {
      id: true,
    },
    orderBy: {
      simplifiedName: 'asc',
    },
  })
  const unpublishedCategories = await prisma.category.findMany({
    where: {
      isPublished: false,
    },
    select: {
      id: true,
    },
    orderBy: {
      simplifiedName: 'asc',
    },
  })

  for (let i = 0; i < 5; i++) {
    await prisma.product.createMany({
      data: [
        {
          categoryId: publishedCategories[i].id,
          name: `Product c${i} published`,
          simplifiedName: `product-c${i}-published`,
          isPublished: true,
        },
        {
          categoryId: publishedCategories[i].id,
          name: `Product c${i} unpublished`,
          simplifiedName: `product-c${i}-unpublished`,
          isPublished: false,
        },
      ],
    })
  }
  for (let i = 0; i < 5; i++) {
    await prisma.product.create({
      data: {
        categoryId: unpublishedCategories[i].id,
        name: `Product c${i + 5} unpublished`,
        simplifiedName: `product-c${i + 5}-unpublished`,
        isPublished: false,
      },
    })
  }

  const products = await prisma.product.findMany({
    select: {
      id: true,
    },
  })

  for (const product of products) {
    await prisma.productImage.createMany({
      data: [
        {
          productId: product.id,
          url: 'https://picsum.photos/seed/picsum/200/300',
        },
        {
          productId: product.id,
          url: 'https://picsum.photos/seed/picsum/200/300',
        },
      ],
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
