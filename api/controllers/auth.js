import User from '../models/User.js'
import bcrypt from 'bcryptjs'

export const signIn = async (req, res, next) => {
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
