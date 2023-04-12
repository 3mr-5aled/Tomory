import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  products: [],
}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    STORE_PRODUCTS(state, action) {
      state.products = action.payload.products
    },
    UPDATE_PRODUCTS(state, action) {
      const index = state.products.findIndex((p) => p.id === action.payload.id)
      if (index !== -1) {
        state.products[index] = action.payload
      }
    },
  },
})

export const { STORE_PRODUCTS, UPDATE_PRODUCTS } = productSlice.actions

export const selectProducts = (state) => state.product.products

export default productSlice.reducer
