const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    birthday: Date,
    image: {type: String, trim: true},
    library:[String],

    // Debatir en grupo si agregar o no una propiedad de imagen en el modelo..
  
})

const User = mongoose.model('user', userSchema)

module.exports = User