import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoute from './routes/users.js'
import videoRoute from './routes/videos.js'
import commentRoute from './routes/comments.js'
import authRoute from './routes/auth.js'

const app = express()
dotenv.config()

const connect = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to Database'))
    .catch((err) => console.log('oh there is an error 💥', err))
}

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/videos', videoRoute)
app.use('/api/comments', commentRoute)

const PORT = 8800
app.listen(PORT, () => {
  connect()
  console.log(`Server is running on port ${PORT}`)
})
