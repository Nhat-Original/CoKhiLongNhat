'use client'
import React from 'react'
import { Button } from 'flowbite-react'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import useProductDetailStore from '../../hooks/useProductDetailStore'
import { useShallow } from 'zustand/react/shallow'

const FavoriteButton = ({ productId }: { productId: string }) => {
  const [isFavorite, setIsFavorite] = useProductDetailStore(
    useShallow((state) => [state.isFavorite, state.setIsFavorite]),
  )

  return (
    <Button
      size={'xs'}
      color="transparent"
      className="font-medium text-cyan-600 hover:underline hover:scale-105 dark:text-cyan-500"
      onClick={() => {
        if (isFavorite) {
          localStorage.setItem(
            'isFavorite',
            JSON.stringify(
              (JSON.parse(localStorage.getItem('isFavorite') || '[]') as string[]).filter((id) => id !== productId),
            ),
          )
          setIsFavorite(false)
        } else {
          localStorage.setItem(
            'isFavorite',
            JSON.stringify([...(JSON.parse(localStorage.getItem('isFavorite') || '[]') as string[]), productId]),
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
