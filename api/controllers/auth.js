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
