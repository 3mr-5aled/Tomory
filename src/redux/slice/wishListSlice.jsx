import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

const initialState = {
  wishListItems: localStorage.getItem("wishListItems")
    ? JSON.parse(localStorage.getItem("wishListItems"))
    : [],
  wishListTotalQuantity: 0,
  wishListTotalAmount: 0,
}

const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    ADD_TO_WISHLIST(state, action) {
      const { id } = action.payload
      const itemIndex = state.wishListItems.findIndex((item) => item.id === id)
      if (itemIndex === -1) {
        state.wishListItems.push(action.payload)
        toast.success(`Added to Wishlist`, {
          position: "top-left",
        })
      } else {
        state.wishListItems.splice(itemIndex, 1)
        toast.error(`Removed from Wishlist`, {
          position: "top-left",
        })
      }
      localStorage.setItem("wishListItems", JSON.stringify(state.wishListItems))
    },

    REMOVE_FROM_WISHLIST(state, action) {
      state.wishListItems = state.wishListItems.filter(
        (item) => item.id !== action.payload.id
      )
      toast.error(`Removed from Wishlist`, {
        position: "top-left",
      })
      localStorage.setItem("wishListItems", JSON.stringify(state.wishListItems))
    },
    CLEAR_WISHLIST(state, action) {
      state.wishListItems = []
      toast.info(`Wishlist cleared`, {
        position: "top-left",
      })

      localStorage.setItem("wishListItems", JSON.stringify(state.wishListItems))
    },
  },
})

export const { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, CLEAR_WISHLIST } =
  wishListSlice.actions

export const selectWishListItems = (state) => state.wishList.wishListItems
export const selectWishListTotalQuantity = (state) =>
  state.wishList.wishListTotalQuantity
export const selectWishListTotalAmount = (state) =>
  state.wishList.wishListTotalAmount

export default wishListSlice.reducer
