import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isLoggedIn: false,
  userID: null,
  userName: null,
  userEmail: null,
  userPhoto: null,
}

const authFeature = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER(state, action) {
      //   console.log(action.payload)
      const { userEmail, userName, userID, userPhoto } = action.payload
      state.isLoggedIn = true
      state.userID = userID
      state.userName = userName
      state.userEmail = userEmail
      state.userPhoto = userPhoto
    },
    REMOVE_ACTIVE_USER(state, action) {
      state.isLoggedIn = false
      state.userID = null
      state.userName = null
      state.userEmail = null
      state.userPhoto = null
    },
  },
})

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authFeature.actions

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectUserName = (state) => state.auth.userName
export const selectUserEmail = (state) => state.auth.userEmail
export const selectUserID = (state) => state.auth.userID
export const selectUserPhoto = (state) => state.auth.userPhoto

export default authFeature.reducer
