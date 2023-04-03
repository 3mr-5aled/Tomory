import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  products: [],
}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    ProductsState(state, action) {
      state.products.push(action.payload)
    },
    UpdateProduct(state, action) {
      const index = state.products.findIndex((p) => p.id === action.payload.id)
      if (index !== -1) {
        state.products[index] = action.payload
      }
    },
  },
})

export const { ProductsState, UpdateProduct } = productSlice.actions

export const selectProducts = (state) => state.product.products

export default productSlice.reducer
