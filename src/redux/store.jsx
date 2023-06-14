import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import authReducer from "./slice/authSlice"
import productReducer from "./slice/productSlice"
import cartReducer from "./slice/cartSlice"
import wishListReducer from "./slice/wishListSlice"
import orderReducer from "./slice/orderSlice"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "product", "cart", "order"],
}

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  cart: cartReducer,
  wishList: wishListReducer,
  order: orderReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export const persistor = persistStore(store)

export default store
