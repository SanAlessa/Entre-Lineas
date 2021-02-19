const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  genre: String,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  stars:[{type: String}],
  comments: [{userPic: String, firstName: String, lastName: String, content: String, userId: String}],
  views:Number,
  chapters:[{title: String, chapter:[{content:String}]}],
  image: String,
})

const Book = mongoose.model('book', bookSchema)

module.exports = Book