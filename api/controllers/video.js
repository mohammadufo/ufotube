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
    const video = Video.findById(req.params.id)
    if (!video) return next(createError(404, 'video not found!'))
    if (req.user.id !== video.userId)
      return next(createError(403, 'you can update only your video'))

    const updatedVideo = Video.findByIdAndUpdate(
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
  } catch (err) {}
}
export const getVideo = async (req, res, next) => {
  try {
  } catch (err) {}
}
