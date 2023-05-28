import { createError } from '../utils/customError.js'
import User from '../models/User.js'

export const updateUser = async (req, res, next) => {
  if (req.params.id !== req.user.id)
    return next(createError(403, 'you can update only your account'))

  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { $new: true }
    )

    res.status(200).json({
      success: true,
      data: updateUser,
    })
  } catch (err) {
    next(err)
  }
}

export const deleteUser = async (req, res, next) => {
  if (req.params.id !== req.user.id)
    return next(createError(403, 'you can delete only your account'))

  try {
    await User.findByIdAndDelete(req.params.id)

    res.status(200).json({
      success: true,
      message: 'User has been deleted',
    })
  } catch (err) {
    next(err)
  }
}

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return next(createError(404, 'user not found'))

    res.status(200).json({
      success: true,
      data: user,
    })
  } catch (err) {
    next(err)
  }
}
export const subscribeUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    })
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    })
    res.status(200).json({
      success: true,
      message: 'Subscribed!',
    })
  } catch (err) {
    next(err)
  }
}

export const unSubscribeUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    })
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    })

    res.status(200).json({
      success: true,
      message: 'UnSubscribed!',
    })
  } catch (err) {
    next(err)
  }
}
export const like = async (req, res, next) => {
  try {
  } catch (err) {
    next(err)
  }
}
export const disLike = async (req, res, next) => {
  try {
  } catch (err) {
    next(err)
  }
}
