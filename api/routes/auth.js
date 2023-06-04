import express from 'express'
import { signIn, signUp, googleAuth, logout } from '../controllers/auth.js'

const router = express.Router()

//* CREATE USER
router.post('/signup', signUp)

//* SIGN IN
router.post('/signin', signIn)

//* LOGOUT
router.post('/logout', logout)

//* GOOGLE AUTH
router.post('/google', googleAuth)

export default router
