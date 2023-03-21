import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  prodName: null,
  prodDesc: null,
  prodPrice: null,
  prodSize: null,
  prodCat: false,
}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    ADD_NEW_PRODUCT(state, action) {
      const { userEmail, userName, userID, userPhoto } = action.payload
      state.prodName = prodName
      state.prodDesc = prodDesc
      state.prodPrice = prodPrice
      state.prodSize = prodSize
      state.prodCat = false
    },
  },
})

export const { ADD_NEW_PRODUCT } = productSlice.actions

export const selectProdName = (state) => state.auth.prodName
export const selectProdDesc = (state) => state.auth.prodDesc
export const selectProdPrice = (state) => state.auth.prodPrice
export const selectProdSize = (state) => state.auth.prodSize
export const selectProdCat = (state) => state.auth.prodCat

export default productSlice.reducer
