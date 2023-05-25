import express from 'express'
import { signIn } from '../controllers/auth.js'

const router = express.Router()

//* CREATE USER
router.post('/signup', signIn)

//* SIGN IN
router.post('/signin')

//* GOOGLE AUTH
router.post('/google')

export default router
