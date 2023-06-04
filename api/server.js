import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoute from './routes/users.js'
import videoRoute from './routes/videos.js'
import commentRoute from './routes/comments.js'
import authRoute from './routes/auth.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

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

app.use(express.static(path.join(__dirname, '../client/dist')))
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
)

const PORT = parseInt(process.env.PORT || '8800', 10)
app.listen(PORT, () => {
  connect()
  console.log(`Server is running on port ${PORT}`)
})
