import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface User {
  _id: string
  name: string
  email: string
  img: string
  subscribedUsers: string[]
  subscribers: number
  createdAt: string
  updatedAt: string
}

export interface UserSlice {
  currentUser: User | null
  loading: boolean
  registerLoading: boolean
  error: boolean
}

const initialState: UserSlice = {
  currentUser: null,
  loading: false,
  registerLoading: false,
  error: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false
      state.currentUser = action.payload
      // localStorage.setItem('user', JSON.stringify(action.payload))
    },
    loginFailure: (state) => {
      state.loading = false
      state.error = true
    },
    registerStart: (state) => {
      state.registerLoading = true
    },
    registerSuccess: (state, action: PayloadAction<User>) => {
      state.registerLoading = false
      state.currentUser = action.payload
      // localStorage.setItem('user', JSON.stringify(action.payload))
    },
    registerFailure: (state) => {
      state.registerLoading = false
      state.error = true
    },
    logout: (state) => {
      state.loading = false
      state.error = false
      state.currentUser = null
      state.registerLoading = false
      localStorage.removeItem('persist:root')
    },
  },
})

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
} = userSlice.actions

export default userSlice.reducer
