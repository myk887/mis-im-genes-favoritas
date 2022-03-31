const express = require('express')
require('dotenv').config()
const router = require('express').Router()
const imagenesRepositorio = require('./../repositorio/mysql-imagenes')
const guardarImagenes = require('./../guardarImagenes/guardarImagenes')
const validadorImagenes = require('./../validador/validadorImagenes')


const { JWT_PRIVATE_KEY} = process.env

const app = express()
app.use('/uploads', express.static('uploads'))

router.post('/',  async (req, res) => {
    let newImage
    if (req.files) {
        try {
            newImage = await guardarImagenes(req.files.image)
        } catch (error) {
            res.status(500)
            res.end({error: error.message})
            return
        }
    } else {
        res.status(404)
        res.end({error: 'Error con subida de imagen.'})
        return
    }

    const imageSaveIncomplete = JSON.parse(req.body.imageSave)
    const imageSave = {...imageSaveIncomplete, Imagen: newImage}

    try {
        await validadorImagenes.validateAsync(imageSave)
    } catch (error) {
         res.status(404)
         res.end({error: error.message})
         return
    }

    let image
    try {
        image = await imagenesRepositorio.postImage({imageSave})
    } catch (error) {
        res.status(500)
        res.end({error: error.message})
        return
    }

    if (!image || !imageSave) {
        res.status(404)
        res.end({error : 'image not found'})
        return
    }

    res.status(200)
    res.send(image)
})


router.get('/', async (req, res) => {
    let result
    try {
        result = await imagenesRepositorio.getImage()
    } catch (error) {
        res.status(500)
        res.end({error: error.message})
        return
    }

    if (!result) {
        res.status(404)
        res.end({error: 'no encontradas imagenes'})
        return
    }
    res.status(200)
    res.send(result)
})
router.get('/:id', async (req, res) => {
    const idImage = req.params.id
    let result
    try {
        result = await imagenesRepositorio.getImagebyId({id: idImage})
    } catch (error) {
        res.status(500)
        res.end({error: error.message})
        return
    }

    if (!result) {
        res.status(404)
        res.end({error: 'no encontradas imagenes'})
        return
    }
    res.status(200)
    res.send(result)
})

router.delete('/', async (req, res) => {
    const {id} = req.body

    let newImage
    try {
        newImage = await imagenesRepositorio.deleteImage({id})
    } catch (error) {
        res.status(500)
        res.end({error: error.message})
        return
    }
    
    if (!newImage) {
        res.status(401)
        res.end({error: ' no se ha podido borrar '})
        return
    }

    res.status(200)
    res.send({ ok: 'borrado' })
})


router.patch('/:id', async (req, res) => {
    let newImage

    if (!!req.files) {
     try {
        newImage = await guardarImagenes(req.files.image)
    } catch (error) {
        res.status(500)
        res.end({error: error.message})
        return
    }}

    const imageSaveIncomplete = JSON.parse(req.body.image)
    const imageSave = {...imageSaveIncomplete, Imagen: newImage ? newImage : null}
    try {
        const idImage = req.params.id
        const image = await imagenesRepositorio.editImage({imageSave, id: idImage})

        if (!image || !imageSave) {
            res.status(400)
            res.end({error : 'hubo un error en el cambio'})
        } else {


            res.status(200)
            res.send(image)
        }
    } catch (error) {
        res.status(501)
        res.end(error.message)
        return
    }
})






module.exports = router
