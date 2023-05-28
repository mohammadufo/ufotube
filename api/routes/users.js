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
router.put('/sub/:id', verifyToken, subscribeUser)
//* UNSUBSCRIBE USER
router.put('/unsub/:id', verifyToken, unSubscribeUser)
//* LIKE VIDEO
router.put('/like/:videoId', verifyToken, like)
//* DISLIKE VIDEO
router.put('/dislike/:videoId', verifyToken, disLike)

export default router
