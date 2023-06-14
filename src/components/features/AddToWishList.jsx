import React, { useState } from "react"
import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  selectWishListItems,
} from "../../redux/slice/wishListSlice"
import { useDispatch, useSelector } from "react-redux"

const AddToWishList = ({ product }) => {
  const [wishListFill, setWishListFill] = useState("none")
  const wishListItems = useSelector(selectWishListItems)
  const dispatch = useDispatch()

  const handleWishList = (product) => {
    dispatch(ADD_TO_WISHLIST(product))
  }
  const getProductClasses = (product) => {
    const index = wishListItems.findIndex((item) => item.id === product.id)
    return index !== -1
      ? "fill-current text-red-500 h-6 w-6"
      : "fill-none h-6 w-6"
  }
  return (
    <button
      onClick={() => handleWishList(product)}
      className="absolute right-4 top-4 z-50 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75"
    >
      <span className="sr-only">Wishlist</span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className={getProductClasses(product)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
      <span className="pointer-events-none absolute -top-8 -left-5 w-max opacity-0 transition-opacity group-hover:opacity-100 bg-gray-700 rounded-md px-3 py-2 text-white">
        WishList
      </span>
    </button>
  )
}

export default AddToWishList
