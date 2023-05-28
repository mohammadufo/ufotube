import express from 'express'
import {
  addVideo,
  deleteVideo,
  getVideo,
  updateVideo,
  addView,
  trendVideos,
  subVideos,
  randomVideos,
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
router.put('/view/:id', addView)

//* GET TREND VIDEOS
router.get('/trend', trendVideos)

//* GET RANDOM VIDEOS
router.get('/random', randomVideos)

//* SUBSCRIBE CHANNELS VIDEOS
router.put('/sub', subVideos)

export default router
