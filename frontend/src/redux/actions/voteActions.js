import axios from 'axios'
import Swal from 'sweetalert2'
import {API} from '../../Api'

const voteActions = {
  vote: (id, token) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.post(`${API}vote`, {id}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        dispatch({type: 'VOTE', payload: response.data})
      }catch(error){
        Swal.fire({
          icon: 'error',
          title: '¡Lo siento!',
          text: "No se puede votar en este momento, intente mas tarde.",
          showConfirmButton: false,
          timer: 4000
          })
      }
    }
  },
  dismissVote: (id, token) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.post(`${API}dismissvote`, {id}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        dispatch({type: 'DISMISS_VOTE', payload: response.data})
      }catch(error){
        Swal.fire({
          icon: 'error',
          title: '¡Lo siento!',
          text: "No se puede sacar el voto en este momento, intente mas tarde.",
          showConfirmButton: false,
          timer: 4000
          })
      }
    }
  }
}

export default voteActions