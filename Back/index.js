require('dotenv').config()
const fileUpload = require('express-fileupload')
const express = require('express')
const {PORT, BASE_URL} = process.env
const routesImagenes = require('./routes/routesImagenes')
const cors = require('cors')

const app = express()

app.use(fileUpload())

app.use(express.json())

app.use(cors())

app.use('/uploads', express.static('uploads'))

app.use('/imagenes', routesImagenes)


app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en ${BASE_URL}:${PORT}`)
  })