export type Video = {
  _id: string
  userId: string
  title: string
  desc: string
  imgUrl: string
  videoUrl: string
  views: number
  tags: string[]
  likes: string[]
  disLikes: string[]
  createdAt: string
  updatedAt: string
}

export type commentObj = {
  _id: string
  userId: string
  videoId: string
  desc: string
  createdAt: string
  updatedAt: string
}
