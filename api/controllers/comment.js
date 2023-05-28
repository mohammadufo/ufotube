import Comment from '../models/Comment.js'
import { createError } from '../utils/customError.js'

export const addComment = async (req, res, next) => {
  try {
    const comment = new Comment({ userId: req.user.id, ...req.body })
    const savedComment = await comment.save()

    res.status(201).json({
      success: true,
      data: savedComment,
    })
  } catch (err) {
    next(err)
  }
}

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id)
    if (!comment) return next(createError(404, 'Comment not found!'))
    if (comment.userId !== req.user.id)
      return next(createError(403, 'you can delete only your comment'))

    await Comment.findByIdAndDelete(req.params.id)

    res.status(200).json({
      success: true,
      message: 'comment has been deleted',
    })
  } catch (err) {
    next(err)
  }
}

export const getComments = async (req, res, next) => {
  try {
  } catch (err) {
    next(err)
  }
}
