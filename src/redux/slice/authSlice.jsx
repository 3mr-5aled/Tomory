import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isLoggedIn: false,
  userID: null,
  userName: null,
  userEmail: null,
  userPhoto: null,
  isAdmin: false,
}
const admin1 = import.meta.env.VITE_ADMIN_1
const admin2 = import.meta.env.VITE_ADMIN_2

const authFeature = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER(state, action) {
      const { userEmail, userName, userID, userPhoto } = action.payload
      state.isLoggedIn = true
      state.userID = userID
      state.userName = userName
      state.userEmail = userEmail
      state.userPhoto = userPhoto
      state.isAdmin = userEmail === admin1 || admin2
    },
    REMOVE_ACTIVE_USER(state, action) {
      state.isLoggedIn = false
      state.userID = null
      state.userName = null
      state.userEmail = null
      state.userPhoto = null
      state.isAdmin = false
    },
    SET_IS_ADMIN(state, action) {
      state.isAdmin = action.payload
    },
  },
})

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER, SET_IS_ADMIN } =
  authFeature.actions

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectUserName = (state) => state.auth.userName
export const selectUserEmail = (state) => state.auth.userEmail
export const selectUserID = (state) => state.auth.userID
export const selectUserPhoto = (state) => state.auth.userPhoto
export const selectIsAdmin = (state) => state.auth.isAdmin

export default authFeature.reducer
