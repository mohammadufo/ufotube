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
    subscription: (state, action) => {
      if (state.currentUser.subscribedUsers.includes(action.payload)) {
        state.currentUser.subscribedUsers.splice(
          state.currentUser.subscribedUsers.findIndex(
            (channelId) => channelId === action.payload
          ),
          1
        )
      } else {
        state.currentUser.subscribedUsers.push(action.payload)
      }
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
  subscription,
} = userSlice.actions

export default userSlice.reducer
