import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoute from './routes/users.js'
import videoRoute from './routes/videos.js'
import commentRoute from './routes/comments.js'
import authRoute from './routes/auth.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
dotenv.config()
app.use(express.json())
app.use(cookieParser())
app.use(cors())

const connect = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to Database'))
    .catch((err) => console.log('oh! there is an error 💥', err))
}

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/videos', videoRoute)
app.use('/api/comments', commentRoute)

app.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Something went wrong!'
  return res.status(status).json({
    success: 'false',
    status,
    message,
  })
})

const PORT = 8800
app.listen(PORT, () => {
  connect()
  console.log(`Server is running on port ${PORT}`)
})
