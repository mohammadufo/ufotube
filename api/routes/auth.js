import express from 'express'
import { signIn, signUp, googleAuth } from '../controllers/auth.js'

const router = express.Router()

//* CREATE USER
router.post('/signup', signUp)

//* SIGN IN
router.post('/signin', signIn)

//* GOOGLE AUTH
router.post('/google', googleAuth)

export default router
