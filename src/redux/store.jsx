import { configureStore, combineReducers } from "@reduxjs/toolkit"
import authReducer from "./slice/authSlice"
import productReducer from "./slice/productSlice"
import cartReducer from "./slice/cartSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  cart: cartReducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export default store
