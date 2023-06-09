import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { createError } from '../utils/customError.js'
import jwt from 'jsonwebtoken'

export const signUp = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)
    const newUser = new User({ ...req.body, password: hash })

    await newUser.save()
    res.status(201).json({
      success: 'true',
      data: newUser,
    })
  } catch (err) {
    next(err)
  }
}

export const signIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name })
    if (!user) return next(createError(404, 'User not found'))

    const correctPass = await bcrypt.compare(req.body.password, user.password)
    if (!correctPass) return next(createError(400, 'wrong credentials'))

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)

    const { password, ...others } = user._doc

    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        success: true,
        data: others,
      })
  } catch (err) {
    next(err)
  }
}

export const logout = async (req, res) => {
  res
    .clearCookie('access_token', {
      sameSite: 'none',
      secure: true,
    })
    .status(200)
    .send('user has been logged out!')
}

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
      res
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .status(200)
        .json({
          success: true,
          data: user._doc,
        })
      return
    }

    const newUser = new User({
      ...req.body,
      fromGoogle: true,
    })

    const savedUser = await newUser.save()
    const token = jwt.sign({ id: savedUser.id }, process.env.JWT_SECRET)
    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(201)
      .json({
        success: true,
        data: savedUser,
      })
  } catch (err) {
    next(err)
  }
}
