import express from 'express'
import { verifyToken } from '../utils/verifyToken.js'
import {
  deleteUser,
  disLike,
  getUser,
  like,
  subscribeUser,
  unSubscribeUser,
  updateUser,
} from '../controllers/user.js'

const router = express.Router()

//* UPDATE USER
router.put('/:id', verifyToken, updateUser)
//* DELETE USER
router.delete('/:id', verifyToken, deleteUser)
//* GET USER
router.get('/find/:id', getUser)
//* SUBSCRIBE USER
router.put('/sub/:id', subscribeUser)
//* UNSUBSCRIBE USER
router.put('/unsub/:id', unSubscribeUser)
//* LIKE VIDEO
router.put('/like/:videoid', like)
//* DISLIKE VIDEO
router.put('/like/:videoid', disLike)

export default router
