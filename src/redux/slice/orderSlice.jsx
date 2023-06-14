import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  orders: [],
  totalOrderAmount: null,
}

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    STORE_ORDERS(state, action) {
      state.orders = action.payload
    },
    CALC_TOTAL_ORDER_AMOUNT(state, action) {
      const array = []
      state.orders.map((item) => {
        const { orderAmount } = item
        return array.push(orderAmount)
      })
      const totalAmount = array.reduce((a, b) => {
        return a + b
      }, 0)
      state.totalOrderAmount = totalAmount
    },
  },
})

export const { STORE_ORDERS, CALC_TOTAL_ORDER_AMOUNT } = orderSlice.actions

export const selectOrderHistory = (state) => state.order.orders
export const selectTotalOrderAmount = (state) => state.order.totalOrderAmount
export const selectOrderById = (state, orderId) => {
  return state.order.orders.find((order) => order.id === orderId)
}

export default orderSlice.reducer
