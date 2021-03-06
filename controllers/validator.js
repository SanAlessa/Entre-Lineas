const Joi = require('joi')

const validator = {
    validNewAccount: (req, res, next) => {
        const schema = Joi.object({
            firstname: Joi.string().trim().required().min(2).message({
                "string.min": "Tu nombre debe contener al menos 2 letras",
            }),
            lastname: Joi.string().trim().required().min(2).message({
                "string.min": "Tu apellido debe contener al menos 2 letras",
            }),
            email: Joi.string().trim().required().email({tlds: {allow: false}}).message({
                "string.email": "Por favor escribe una direccion de correo valida"
            }),
            password: Joi.string().trim().required().pattern(/(?=.*\d)/).min(5).message({
                "string.min": "Tu contraseña debe contener al menos 5 caracteres",
            }),
            birthday: Joi.string(),
            image: Joi.string().empty("")
        })

        const validation = schema.validate(req.body, {abortEarly: false})

        if (!validation.error) {
            next()
        } else {
            console.log(validation.error.details)
            res.json({success: false, errores: validation.error.details})
        }
      }
  }
  

  module.exports = validator