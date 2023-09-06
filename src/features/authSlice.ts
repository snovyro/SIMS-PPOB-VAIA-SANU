/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { token } = action.payload
      state.token = token
    },
    clearCredentials: (state) => {
      state.token = null
    },
  },
})

export const { setCredentials, clearCredentials } = authSlice.actions
export default authSlice.reducer
export const selectToken = (state: { auth: { token: any } }) => state.auth.token
