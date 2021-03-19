const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require ("jsonwebtoken")

const userController = {

    signUp: async (req, res) => {
        const {firstname, lastname, email, password, birthday, image} = req.body
        const userExists = await User.findOne({email: email})
        console.log('llega')
        if (userExists) {
            return res.json({success: false, error: 'El email ya esta registrado'})
        }
        else{
            const passwordHasheado = bcryptjs.hashSync(password, 10)
            var newUser = new User({
                firstname, lastname, email, password: passwordHasheado, birthday, image
            })
            var newUserSaved = await newUser.save()
            var token = jwt.sign({...newUserSaved}, process.env.SECRET_KEY, {})
        }
        return res.json({success: true,
            response: {token, firstname: newUserSaved.firstname, email: newUserSaved.email, lastname: newUserSaved.lastname, birthday: newUserSaved.birthday, image: newUserSaved.image, id: newUserSaved._id}})
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
            {token, firstname: userExists.firstname, email: userExists.email, lastname: userExists.lastname, birthday: userExists.birthday, image: userExists.image, id: userExists._id}})
    },

    logFromLS: async (req, res) => {
        res.json({success: true, response: 
            {token: req.body.token, firstname: req.user.firstname, lastname: req.user.lastname, email: req.user.email, birthday: req.user.birthday, id:req.user._id, image: req.user.image}})
    },



    modifyUser: (req, res) => {
        const {id, email, firstname, lastname, birthday} = req.body
        const {image} = req.files
        const pic = image.name.split('.')
        const url = `userimages/${id}.${pic[1]}`
        console.log(req)
        console.log(req.files)
        image.mv(`./client/build/userimages/${id}.${pic[1]}`, errores=> {
        if(errores) {
            return res.json({
                success: false,
                errores:errores,
                mensaje:'No se puede actualizar. Intente mas tarde'
            })
        }
        })
        User.findOneAndUpdate({_id: id},
        {$set: {firstname, email, lastname, birthday, image: url}},
        {new: true})
        .then(data => res.json({ success: true, response: data }))
        .catch(error => res.json({ success: false, error }))
    },

}

module.exports = userController