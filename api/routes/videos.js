import express from 'express'
import {
  addVideo,
  deleteVideo,
  getVideo,
  updateVideo,
} from '../controllers/video.js'
import { verifyToken } from '../utils/verifyToken.js'

const router = express.Router()

//* CREATE VIDEO
router.post('/', verifyToken, addVideo)

//* UPDATE VIDEO
router.put('/:id', verifyToken, updateVideo)

//* GET A VIDEO
router.get('/find/:id', getVideo)

//* DELETE VIDEO
router.delete('/:id', verifyToken, deleteVideo)

//* UPDATE VIEWS OF VIDEO
router.put('/view/:id')

//* GET TREND VIDEOS
router.get('/trend')

//* GET RANDOM VIDEOS
router.get('/random')

//* SUBSCRIBE CHANNELS VIDEOS
router.put('/sub')

export default router
