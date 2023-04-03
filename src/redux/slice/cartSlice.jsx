import { createSlice } from "@reduxjs/toolkit"

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload)
    },
    removeItem: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      )
      if (index !== -1) {
        state.items.splice(index, 1)
      }
    },
  },
})

export const { addItem, removeItem } = cartSlice.actions

export default cartSlice.reducer

export const selectCartItems = (state) => state.cart.items

// import { createSlice } from "@reduxjs/toolkit"

// export const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     items: [],
//   },
//   reducers: {
//     addToCart: (state, action) => {
//       const item = action.payload
//       const existingItem = state.items.find((i) => i.id === item.id)

//       if (existingItem) {
//         existingItem.quantity += 1
//       } else {
//         state.items.push({ ...item, quantity: 1 })
//       }
//     },
//     removeFromCart: (state, action) => {
//       const itemId = action.payload
//       state.items = state.items.filter((i) => i.id !== itemId)
//     },
//     updateQuantity: (state, action) => {
//       const { id, quantity } = action.payload
//       const item = state.items.find((i) => i.id === id)

//       if (item) {
//         item.quantity = quantity
//       }
//     },
//   },
// })

// export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions

// export default cartSlice.reducer
