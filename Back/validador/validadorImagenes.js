const Joi = require('joi')

const usersShema = Joi.object({
    titulo: Joi.string()
        .required()
        .messages({
            'string.entry': '[titulo] is required',
            'any.required': '[titulo] is required',
            'string.pattern': '[titulo] error'
    }),
    Imagen: Joi.string()
        .min(3)
        .messages({
            'string.entry': '[Imagen] is required',
            'string.min': '[Imagen] should be more than 3 characters'
        })
})

module.exports = usersShema