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
      className="group/wishlist relative z-50 rounded-full bg-white/80 p-2 text-slate-900 shadow-sm backdrop-blur-md transition-all hover:bg-white hover:text-red-500 hover:shadow-md dark:bg-slate-800/80 dark:text-slate-100 dark:hover:bg-slate-700"
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
      <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 scale-75 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white opacity-0 transition-all group-hover/wishlist:scale-100 group-hover/wishlist:opacity-100">
        Wishlist
      </span>
    </button>
  )
}

export default AddToWishList
