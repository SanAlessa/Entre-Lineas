const nodemailer = require('nodemailer')
const User = require('../models/User')
const bcryptjs = require('bcryptjs')

var transport = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
  })
  
  const passwordController = {

  restartPassword: async (req, res) => {
    var errores = []
    const {email} = req.body
   
    const emailValido = await User.findOne({email: email})
    if (!emailValido) {
        errores.push('El mail no coincide con nuestros registros')
    }

    const content = 
    `<h3>Este email se ha enviado por una solicitud para restablecer la contraseña en la pagina Entre Lineas, si usted no lo solicio
    por favor ignore este correo, de lo contrario haga click en el boton de abajo</h3>
    <button><a href="https://entrelineas.herokuapp.com/reset-password/${email}">¡Recupera tu contraseña!</a></button>`
    var mailOptions = {
        from: 'Entre Lineas <entrelineasmh@gmail.com>',
        to: email,
        subject: 'Recupero de Contraseña',
        html: content
    }
    transport.sendMail(mailOptions, () => {
        console.log("Mail enviado")
    })
    res.json({success: true})
  },

  changePassword: async (req, res) => {
    var errores = ''
    const {password, email} = req.body
    const emailValido = await User.findOne({email: email})
    if (!emailValido){
        return res.json({success: false, error: 'El mail no se encuentra registrado'})
    }
    if (errores.length === 0) {
        const passwordHasheado = bcryptjs.hashSync(password, 10)
        User.findOneAndUpdate({email: email}, 
            {$set: {password: passwordHasheado}},
            {new: true})
        .then(response => res.json({ success: true, response }))
        .catch(error => res.json({ success: false, error}))
        }
  }
}

module.exports = passwordController;
