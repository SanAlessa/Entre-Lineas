const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require ("jsonwebtoken")
const crypto = require ("crypto")

const userController = {

    signUp: async (req, res) => {
        var errores = []
        const {firstname, lastname, email, password, birthday} = req.body
        const userExists = await User.findOne({email: email})
        if (userExists) {
            errores.push('El nombre email ya está siendo utilizado.  Elija otro.')
        }
        if (errores.length === 0) {
            const passwordHasheado = bcryptjs.hashSync(password, 10)
            var newUser = new User({
                firstname, lastname, email, password: passwordHasheado, birthday
            })
            var newUserSaved = await newUser.save()
            var token = jwt.sign({...newUserSaved}, process.env.SECRET_KEY, {})
        }
        return res.json({success: errores.length === 0 ? true : false,
            errores: errores,
            response: errores.length === 0 && 
                {token, firstname: newUserSaved.firstname, email: newUserSaved.email, lastname: newUserSaved.lastname, birthday: newUserSaved.birthday}})
    },

    signIn: async (req, res) => {
        const {email, password} = req.body
        const userExists = await User.findOne({email: email})
        if (!userExists) {
            return res.json({success: false, mensaje: 'Nombre de usuario y/o contraseña incorrectos.'})
        }
        const passwordMatches = bcryptjs.compareSync(password, userExists.password)
        if (!passwordMatches) {
            return res.json({success: false, mensaje: 'Nombre de usuario y/o contraseña incorrectos.'})
        }
        var token = jwt.sign({...userExists}, process.env.SECRET_KEY, {})
        return res.json({success: true, response: 
            {token, firstname: userExists.firstname, email: userExists.email, lastname: userExists.lastname, birthday: userExists.birthday}})
    },

    logFromLS: (req, res) => {
        res.json({success: true, response: 
            {token: req.body.token, firstname: req.user.firstname, lastname: req.user.lastname, email: req.user.email, birthday: req.user.birthday, id:req.user._id, image: req.user.image}})
    },

    modifyUser: (req, res) => {
      const {id, email, firstname, lastname, birthday} = req.body
      const {image} = req.files

      image.mv(`./frontend/public/assets/${firstname}-${id}-${image.name}`, error => {
        if(error) {
          console.log(error)
          return res.json({success: false, error})
        }
      })
      const url = `../assets/${firstname}-${id}-${image.name}`
      console.log(url)

    //   (!email || email=== '') && console.log('email incorrecto')

    //   User.findOneAndUpdate({_id: id}, 
    //     {$set: {firstname, email, lastname, birthday, image: url}},
    //     {new: true})
    //   .then(data => res.json({ success: true, response: data }))
    //   .catch(error => res.json({ success: false, error }))
    },

    resetPassword: (req, res) =>{

        crypto.randomBytes(32,(err,buffer)=>{
            if(err){
                console.log(err)
            }
            const token = buffer.toString("hex")
            User.findOne({email:req.body.email})
            .then(user=>{
                if(!user){
                    return res.status(422).json({error:"User dont exists with that email"})
                }
                user.resetToken = token
                user.expireToken = Date.now() + 3600000
                user.save().then((result)=>{
                    transporter.sendMail({
                        to:user.email,
                        from:"no-replay@insta.com",
                        subject:"password reset",
                        html:`
                        <p>You requested for password reset</p>
                        <h5>click in this <a href="${EMAIL}/reset/${token}">link</a> to reset password</h5>
                        `
                    })
                    res.json({message:"check your email"})
                })
   
            })
        })


    }
}

module.exports = userController