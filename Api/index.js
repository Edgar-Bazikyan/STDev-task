const express = require('express')
const mongoose = require('mongoose')
const muler = require('multer')
const path = require('path')
const cors = require('cors')
const app = express()
const PORT = 5000
const movieRouter = require('./Routes/movieRoutes.js')
const roomRouter = require('./Routes/roomRoutes.js')

const corsOptions = {
    origin: 'http://localhost:3000',
}
app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/Uploads', express.static(path.join(__dirname, 'Uploads')));

const mongoDBUrl = 'mongodb://localhost:27017/CinemaCity'

mongoose.connect(mongoDBUrl)
  .then(() => {
    console.log('MongoDB connected')
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err)
  })


app.use('/api/movies', movieRouter)
app.use('/api/rooms', roomRouter)
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})