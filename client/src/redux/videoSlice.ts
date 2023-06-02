import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Video {
  _id: string
  userId: string
  title: string
  desc: string
  imgUrl: string
  videoUrl: string
  views: string
  tags: string[]
  likes: string[]
  disLikes: string[]
  createdAt: string
  updatedAt: string
}

export interface VideoSlice {
  currentVideo: Video | null
  loading: boolean
  error: boolean
  name: string
}

const initialState: VideoSlice = {
  currentVideo: null,
  loading: false,
  error: false,
  name: 'mamad',
}

export const videoSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true
    },
    fetchSuccess: (state, action: PayloadAction<Video>) => {
      state.loading = false
      state.currentVideo = action.payload
    },
    fetchFailure: (state) => {
      state.loading = false
      state.error = true
    },
    like: (state, action) => {
      if (!state?.currentVideo?.likes?.includes(action.payload)) {
        state?.currentVideo?.likes?.push(action.payload)
        state?.currentVideo?.disLikes?.splice(
          state?.currentVideo?.disLikes?.findIndex(
            (userId) => userId === action.payload
          ),
          1
        )
      }
    },
    disLike: (state, action) => {
      if (!state?.currentVideo?.disLikes?.includes(action.payload)) {
        state?.currentVideo?.disLikes?.push(action.payload)
        state?.currentVideo?.likes?.splice(
          state?.currentVideo?.likes?.findIndex(
            (userId) => userId === action.payload
          ),
          1
        )
      }
    },
  },
})

export const { fetchStart, fetchSuccess, fetchFailure, like, disLike } =
  videoSlice.actions

export default videoSlice.reducer
