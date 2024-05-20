const express = require('express')
const app = express()
const mongoose = require('mongoose')
const hallroutes = require('./Routes/hall.routes')
mongoose
  .connect('mongodb://localhost:27017/PartyHall')
  .then(() => {
    console.log('successful')
  })
  .catch(() => {
    console.log('Connection failed')
  })

// app.use('/api/halls', hallroutes)

app.listen(3006, () => {
  console.log('Server Running ')
})
