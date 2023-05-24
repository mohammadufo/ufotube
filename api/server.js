import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

const connect = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to Database'))
    .catch((err) => console.log('oh there is an error 💥', err))
}

const PORT = 8800
app.listen(PORT, () => {
  connect()
  console.log(`Server is running on port ${PORT}`)
})
