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
  registerLoading: boolean
  error: boolean
}

const initialState: VideoSlice | null = {}

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {},
})

export const {} = videoSlice.actions

export default videoSlice.reducer
