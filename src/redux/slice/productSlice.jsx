import { createSelector, createSlice } from "@reduxjs/toolkit"

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
    STORE_A_PRODUCT: (state, action) => {
      const product = action.payload
      state.products.push(product)
    },
    UPDATE_PRODUCTS(state, action) {
      const index = state.products.findIndex((p) => p.id === action.payload.id)
      if (index !== -1) {
        state.products[index] = action.payload
      }
    },
    SET_REVIEWS: (state, action) => {
      const { productId, reviews } = action.payload
      const product = state.products.find((p) => p.id === productId)
      if (product) {
        product.reviews = reviews
      }
    },
    ADD_REVIEW(state, action) {
      const { productId, review } = action.payload
      const product = state.products.find((p) => p.id === productId)
      if (product) {
        product.reviews.push(review)
      }
    },
    REMOVE_REVIEW(state, action) {
      const { productId, reviewId } = action.payload
      const product = state.products.find((p) => p.id === productId)
      if (product) {
        product.reviews = product.reviews.filter(
          (review) => review.id !== reviewId
        )
      }
    },
    UPDATE_AVERAGE_RATING(state, action) {
      const { productId, averageRating } = action.payload
      const product = state.products.find((p) => p.id === productId)
      if (product) {
        product.averageRating = averageRating
      }
      // const { productId, reviewId, rating } = action.payload
      // const product = state.products.find((p) => p.id === productId)
      // if (product) {
      //   const review = product.reviews.find((r) => r.id === reviewId)
      //   if (review) {
      //     review.rating = rating
      //   }
      // }
    },
  },
})

export const {
  STORE_PRODUCTS,
  STORE_A_PRODUCT,
  UPDATE_PRODUCTS,
  SET_REVIEWS,
  ADD_REVIEW,
  REMOVE_REVIEW,
  UPDATE_AVERAGE_RATING,
} = productSlice.actions

export const selectProducts = (state) => state.product.products

export const selectProductById = (state, productId) =>
  state.product.products.find((p) => p.id === productId)

export const selectProductReviews = createSelector(
  [selectProducts, (state, productId) => productId],
  (products, productId) => {
    const product = products.find((product) => product.id === productId)
    if (product) {
      // Sort the reviews by createdAt in descending order
      const sortedReviews = [...product.reviews].sort(
        (a, b) => b.createdAt - a.createdAt
      )
      return sortedReviews
    }
    return []
  }
)

export default productSlice.reducer
