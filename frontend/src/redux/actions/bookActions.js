import axios from 'axios'
import Swal from'sweetalert2';

const bookActions = {

  addBook: (formData, token) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.post('http://localhost:4000/api/book', formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        dispatch({type: 'ADD_BOOK', payload:response.data.response});

      } catch(error) {
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: "No se pudo crear el libro.",
          text: "Por favor intente mas tarde.",
          showConfirmButton: false,
          timer: 4000
        })
      }
    }
  },

  addImage: (formData, token) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.put('http://localhost:4000/api/book', formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        dispatch({type: 'ADD_BOOK', payload:response.data.response})
      }catch(error){
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: "No se pudo cargar la imagen.",
          text: "Por favor intente mas tarde.",
          showConfirmButton: false,
          timer: 4000
          })}
    }
  },

  getBooks: () => {
    return async (dispatch, getState) => {
      try {
				const response = await fetch('http://localhost:4000/api/book')
				const data = await response.json()
				dispatch({type: 'GET_BOOKS', payload: data.response})
			}catch(error){
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: "Algo salio mal. intente mas tarde.",
          showConfirmButton: false,
          timer: 4000
          })}
      }
  },
  // getNewBook: (id)=>{
  //   return async(dispatch) =>{
  //     try {
  //       const response = await fetch('http://localhost:4000/api/')
  //     }
  //   }
  // },
  getByGenre: (genre)=>{
    return async(dispatch, getState) =>{
      try {
        const response = await fetch('http://localhost:4000/api/book/'+genre)
        const data = await response.json()
        dispatch({type: 'GET_BY_GENRE', payload: data.response})
      }catch(error){
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: "No se pudo cargar la imagen.",
          text: "Por favor intente mas tarde.",
          showConfirmButton: false,
          timer: 4000
          })}
    }
  },

  searchBooks: (value) => {
    return (dispatch, getState) => {
      try {
        dispatch({type: 'SEARCH_BOOKS', payload: value})
      }catch(error){
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: "Algo salio mal. intente mas tarde.",
          showConfirmButton: false,
          timer: 4000
          })}
    }
  },

  addChapter: (title, id, token) => {
    return async (dispatch) => {
      try {
        const response = await axios.post('http://localhost:4000/api/book/addChapter', {title, id}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        dispatch({type: 'ADD_CHAPTER', payload: response.data.response})
      }catch(error){
        console.log(error)
      }
    }
  },

  sendContent: (content, title, id, token) => {
    return async (dispatch) => {
      try {
        const response = await axios.put('http://localhost:4000/api/book/addChapter', {content, title, id}, {
          headers: {
            Authorization : `Bearer ${token}`
          }
        })
        dispatch({type: 'CHAPTER_CONTENT', payload: response.data.response})
      }catch(error){
        console.log(error)
      }
    }
  },

  modifyChapterTitle:(title, id, chapterId, token) =>{
    return async(dispatch) => {
      try {
        const response = await axios.post('http://localhost:4000/api/book/modifyChapterTitle', {title, id, chapterId}, {
          headers: {
            Authorization : `Bearer ${token}`
          }
        })
      }catch(errpr){
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: "No se pudo guardar el capitulo.",
          text: "Por favor intente mas tarde.",
          showConfirmButton: false,
          timer: 4000
        })
      }
    }
  },
  modifyContent: (updatedContent, contentId, chapterId, bookId, token) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.post('http://localhost:4000/api/book/modifyChapter', {updatedContent, contentId, chapterId, bookId}, {
          headers: {
            Authorization : `Bearer ${token}`
          }
        })
        dispatch({type: 'UPDATE_BOOK', payload: response.data.response})
      }catch(error){
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: "No se pudo guardar el capitulo.",
          text: "Por favor intente mas tarde.",
          showConfirmButton: false,
          timer: 4000
          })}
    }
  },

  deleteContent:(contentId, chapterId, bookId, token) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.put('http://localhost:4000/api/book/modifyChapter', {contentId, chapterId, bookId}, {
          headers: {
            Authorization : `Bearer ${token}`
          }
        })
        dispatch({type: 'UPDATE_BOOK', payload: response.data.response})
      }catch(error){
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: "No se pudo guardar el capitulo.",
          text: "Por favor intente mas tarde.",
          showConfirmButton: false,
          timer: 4000
          })}
    }
  },
  deleteBook:(id)=>{
    console.log(id)
    return async (dispatch)=>{
      try {
        const response = await axios.put('http://localhost:4000/api/book/delete', {id})
      }catch(error){
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: "Algo salio mal. intente mas tarde.",
          showConfirmButton: false,
          timer: 4000
        })}
    }
  },

  addComment:(content, id, token) => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.post('http://localhost:4000/api/comments/', {content, id}, {
          headers: {
              Authorization: `Bearer ${token}` 
          }
      })
        dispatch({type: 'ADD_COMMENTS', payload: res.data.respuesta})
      } catch(error){
        Swal.fire({
          icon: 'error',
          title: '¡Lo siento!',
          text: "No se pudo enviar el comentario",
          showConfirmButton: false,
          timer: 4000
          })}
    }
  },

  deleteComment: (id, idcomment, token) => {
    return async(dispatch, getState) => {
      try {
        const res = await axios.put('http://localhost:4000/api/comments/delete', {id, idcomment}, {
          headers: {
              Authorization: `Bearer ${token}` 
          }
      })
        dispatch({type: 'DELETE_COMMENT', payload: res.data.respuesta})
      } catch(error){
        Swal.fire({
          icon: 'error',
          title: '¡Lo siento!',
          text: "Algo salio mal.",
          text: "No se pudo borrar el comentario, intente mas tarde.",
          showConfirmButton: false,
          timer: 4000
          })}
    }
  },

  modComment: (value, idcomment, id, token) => {
    return async (dispatch, getState) => {
      try{
        const res = await axios.put('http://localhost:4000/api/comments/', {value, idcomment, id}, {
          headers: {
              Authorization: `Bearer ${token}` 
          }
      })
        dispatch({type: 'ADD_COMMENTS', payload: res.data.respuesta})
      } catch(error){
        Swal.fire({
          icon: 'error',
          title: '¡Lo siento!',
          text: "Algo salio mal.",
          text: "No se pudo editar el comentario, intente mas tarde.",
          showConfirmButton: false,
          timer: 4000
          })}
    }
  },

  vote:(id, token) => {
    return async(dispatch, getState) => {
      try {
        const res = await axios.post('http://localhost:4000/api/vote', {id}, {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        })
        dispatch({type: 'VOTE', payload: res.data})
      } catch(error){
        Swal.fire({
          icon: 'error',
          title: '¡Lo siento!',
          text: "No se puede votar en este momento, intente mas tarde.",
          showConfirmButton: false,
          timer: 4000
          })}
    }
  },

  dismissVote:(id, token) => {
    return async(dispatch, getState) => {
      try {
        const res = await axios.post('http://localhost:4000/api/dismissvote', {id}, {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        })
        dispatch({type: 'DIS_VOTE', payload: res.data})
      } catch(error){
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          title: '¡Lo siento!',
          text: "No se puede sacar el voto en este momento, intente mas tarde.",
          showConfirmButton: false,
          timer: 4000
          })}
    }
  },

  incViews: (id) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.post('http://localhost:4000/api/views', {id})
        dispatch({type: 'VIEWS', payload: response.data})
      }catch(error){
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          title: '¡Lo siento!',
          text: "Algo salio mal, intente mas tarde.",
          showConfirmButton: false,
          timer: 4000
          })}
    }
  }
}

export default bookActions