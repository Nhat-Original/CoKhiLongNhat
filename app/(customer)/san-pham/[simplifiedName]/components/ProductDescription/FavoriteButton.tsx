'use client'
import React from 'react'
import { Button } from 'flowbite-react'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import useProductDetailStore from '../../stores/useProductDetailStore'
import { useShallow } from 'zustand/react/shallow'

const FavoriteButton = () => {
  const [product, isFavorite, setIsFavorite] = useProductDetailStore(
    useShallow((state) => [state.product, state.isFavorite, state.setIsFavorite]),
  )

  return (
    <Button
      size={'xs'}
      color="transparent"
      className="font-medium text-cyan-700 hover:underline hover:scale-105 dark:text-cyan-500"
      onClick={() => {
        if (isFavorite) {
          localStorage.setItem(
            'favoriteProducts',
            JSON.stringify(
              (JSON.parse(localStorage.getItem('isFavorite') || '[]') as string[]).filter((id) => id !== product?.id),
            ),
          )
          setIsFavorite(false)
        } else {
          localStorage.setItem(
            'favoriteProducts',
            JSON.stringify([...(JSON.parse(localStorage.getItem('isFavorite') || '[]') as string[]), product?.id]),
          )
          setIsFavorite(true)
        }
      }}
    >
      {isFavorite ? <MdFavorite className="h-6 w-6" /> : <MdFavoriteBorder className="h-6 w-6" />}
    </Button>
  )
}

export default FavoriteButton
