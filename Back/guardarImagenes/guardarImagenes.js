const express = require('express')
const fileUpload = require('express-fileupload')
const encryptionCreator = require('./encryptionCreator')

const app = express()

app.use(fileUpload())

app.use(express.json())

app.use('./../uploads', express.static('uploads'))

const guardarImagenes = async (avatar) => {
  const nombreImagen = encryptionCreator()

      await avatar.mv(`./uploads/${nombreImagen}.jpg`)
      return `./uploads/${nombreImagen}.jpg`
}

module.exports = guardarImagenes