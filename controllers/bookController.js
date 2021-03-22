const Book = require('../models/Book')

const bookController = {
  createBook: (req,res) => {
    const {title, description, genre} = req.body
    const createBook = new Book({title, description, genre,
      user: req.user._id})
    createBook.save()
    .then( async createBook => {
      const book = await createBook.populate('user').execPopulate()
      res.json({success: true, response: book})})
    .catch(errores => res.json({
      success: false,
      errores:errores,
      mensaje:'No se puede crear el libro en este momento. Intente mas tarde.'
    }))
  },
  addChapter: (req, res) => {
    const {title, id} = req.body
    Book.findOneAndUpdate({_id:id},
      {$addToSet: {chapters: {title:title}}},
      {new:true})
    .then(response => res.json({success: true, response}))
    .catch(error => res.json({success: false, error}))
  },

  addContent: (req,res) => {
    const {title, content, id} = req.body
    Book.findOneAndUpdate({_id:id, 'chapters.title':title},
      {$addToSet: {'chapters.$.chapter': [content]}},
      {new: true})
    .then(response=> res.json({success: true, response}))
    .catch(error=> res.json({success: false, error}))
  },
  
  addImage: (req, res) => {
    const {id} = req.body
    const {image} = req.files
    const pic = image.name.split('.')
    var url = `../booksimages/${req.user._id}${image.name}`
    image.mv(`./client/build/booksimages/${req.user._id}${image.name}`, error => {
      if(error) {
        return res.json({
          success: false,
          error,
          mensaje:'No se puede agregar la imagen en este momento. Intente mas tarde'
        })
      }
    })
    Book.findOneAndUpdate({_id: id},
      {$set: {image:url}},
      {new: true})
    .then(response=> res.json({success: true, response}))
    .catch(errores => res.json({
      success: false,
      errores:errores,
      mensaje:'No se puede actualizar su imagen en este momento. Intente mas tarde'
    }))
  },

  modifyTitle: async (req,res) => {
    const {title, id, chapterId} = req.body
    await Book.findOneAndUpdate({_id: id, 'chapters._id': chapterId},
      {$set: {'chapters.$.title' : title}},
      {new:true})
    .then(response => res.json({success: true, response}))
    .catch(error => res.json({success: false, error}))
  },

  modifyContent: async (req,res) => {
    const {updatedContent, contentId, chapterId, bookId} = req.body
    const book = await Book.findOne({_id:bookId})
    const chapters = book.chapters.filter(chapter=> chapter._id.toString() === chapterId)
    const chapter = chapters[0].chapter.filter(content=> content._id.toString() === contentId)
    const content = chapter[0].content = updatedContent
    book.save()
    .then(response => res.json({success: true, response}))
    .catch(error => res.json({success: false, error}))
  },

  deleteContent: async (req,res) => {
    const {contentId, chapterId, bookId} = req.body
    await Book.findOneAndUpdate({_id: bookId, 'chapters._id': chapterId},
      {$pull: {"chapters.$.chapter": {'_id':contentId}}},
      {new:true})
    .then(response => res.json({success: true, response}))
    .catch(error => res.json({success: false, error}))
  },

  deleteBook: async (req,res)=>{
    const {id} = req.body
    await Book.findByIdAndRemove(id, {new:true})
    .then(response=> res.json({success: true, response}))
    .catch(error => res.json({success: false, error}))
  },

  getBooks: (req,res) => {
    Book.find().populate('user')
    .then(response => res.json({success: true, response}))
    .catch(error => res.json({success: false, error}))
  },

  getByGenre: async (req,res)=>{
    const genre = req.params.genre
    Book.find({genre:genre}).populate('user')
    .then(response=> res.json({succes:true, response}))
    .catch(error => res.json({succes: false, error}))
  },

  incViews: (req, res) => {
    const {id} = req.body
    Book.findOneAndUpdate({_id:id},
      {$inc: {views: 1}},
      {new:true})
    .then(response => res.json({success: true, response}))
    .catch(error=> res.json({success:false, error}))
  }
}

module.exports = bookController
