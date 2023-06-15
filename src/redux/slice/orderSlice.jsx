import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  orders: [],
  totalOrderAmount: null,
  AdminOrders: [],
}

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    STORE_ORDERS(state, action) {
      state.orders = action.payload
    },
    STORE_ADMIN_ORDERS(state, action) {
      state.AdminOrders = action.payload
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
    UPDATE_ORDERS_STATUS(state, action) {
      const { orderId, orderStatus, editedAt } = action.payload
      const adminOrder = state.AdminOrders.find((order) => order.id === orderId)

      if (adminOrder) {
        adminOrder.orderStatus = orderStatus
        adminOrder.editedAt = editedAt
      }

      const userOrder = state.orders.find((order) => order.id === orderId)

      if (userOrder) {
        userOrder.orderStatus = orderStatus
        userOrder.editedAt = editedAt
      }
    },
  },
})

export const {
  STORE_ORDERS,
  STORE_ADMIN_ORDERS,
  UPDATE_ORDERS_STATUS,
  CALC_TOTAL_ORDER_AMOUNT,
} = orderSlice.actions

export const selectOrders = (state) => state.order.orders
export const selectAdminOrders = (state) => state.order.AdminOrders
export const selectTotalOrderAmount = (state) => state.order.totalOrderAmount
export const selectOrderById = (state, orderId) => {
  return state.order.orders.find((order) => order.id === orderId)
}
export const selectAdminOrderById = (state, orderId) => {
  return state.order.AdminOrders.find((order) => order.id === orderId)
}
// New selector to calculate the sum of all orderAmount values
export const selectTotalOrderAmountSum = (state) => {
  const orderAmounts = state.order.orders.map((order) => order.orderAmount)
  const sum = orderAmounts.reduce((total, amount) => total + amount, 0)
  return sum
}

export const selectDeliveredOrdersCount = (state) => {
  const deliveredOrders = state.order.orders.filter(
    (order) => order.orderStatus === "Delivered"
  )
  return deliveredOrders.length
}

export default orderSlice.reducer
