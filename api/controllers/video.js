import User from '../models/User.js'
import Video from '../models/Video.js'
import { createError } from '../utils/customError.js'

export const addVideo = async (req, res, next) => {
  try {
    const newVideo = new Video({ userId: req.user.id, ...req.body })

    const savedVideo = await newVideo.save()
    res.status(201).json({
      success: true,
      data: savedVideo,
    })
  } catch (err) {}
}

export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id)
    if (!video) return next(createError(404, 'video not found!'))
    if (req.user.id !== video.userId)
      return next(createError(403, 'you can update only your video'))

    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { $new: true }
    )

    res.status(200).json({
      success: true,
      data: updatedVideo,
    })
  } catch (err) {
    next(err)
  }
}
export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id)
    if (!video) return next(createError(404, 'video not found!'))
    if (!req.user.id !== video.userId)
      return next(createError(403, 'you can delete only your video'))

    await Video.findByIdAndDelete(req.params.id)
    res.status(200).json({
      success: true,
      message: 'Video deleted successfully!',
    })
  } catch (err) {
    next(err)
  }
}

export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id)
    if (!video) return next(createError(404, 'video not found'))

    res.status(200).json({ success: true, data: video })
  } catch (err) {
    next(err)
  }
}
export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    })

    res
      .status(200)
      .json({ success: true, message: 'The view has been increased!' })
  } catch (err) {
    next(err)
  }
}
export const trendVideos = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 })

    res.status(200).json({ success: true, data: videos })
  } catch (err) {
    next(err)
  }
}
export const randomVideos = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }])

    res.status(200).json({ success: true, data: videos })
  } catch (err) {
    next(err)
  }
}
export const subVideos = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    const subscribedChannels = user.subscribedUsers

    const list = await Promise.all(
      subscribedChannels.map((channelId) => Video.find({ userId: channelId }))
    )

    res
      .status(200)
      .json({
        success: true,
        data: list.flat().sort((a, b) => b.createdAt - a.createdAt),
      })
  } catch (err) {
    next(err)
  }
}
