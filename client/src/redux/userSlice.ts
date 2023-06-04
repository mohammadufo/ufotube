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
    loginStart: (state: UserSlice) => {
      state.loading = true
    },
    loginSuccess: (state: UserSlice, action: PayloadAction<User>) => {
      state.loading = false
      state.currentUser = action.payload
      // localStorage.setItem('user', JSON.stringify(action.payload))
    },
    loginFailure: (state: UserSlice) => {
      state.loading = false
      state.error = true
    },
    registerStart: (state: UserSlice) => {
      state.registerLoading = true
    },
    registerSuccess: (state: UserSlice, action: PayloadAction<User>) => {
      state.registerLoading = false
      state.currentUser = action.payload
      // localStorage.setItem('user', JSON.stringify(action.payload))
    },
    registerFailure: (state: UserSlice) => {
      state.registerLoading = false
      state.error = true
    },
    logout: (state: UserSlice) => {
      state.loading = false
      state.error = false
      state.currentUser = null
      state.registerLoading = false
      localStorage.removeItem('persist:root')
    },
    subscription: (state: any, action: PayloadAction<string>) => {
      if (state.currentUser.subscribedUsers.includes(action.payload)) {
        state.currentUser.subscribedUsers.splice(
          state.currentUser.subscribedUsers.findIndex(
            (channelId: string) => channelId === action.payload
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
