import axios from 'axios'
import Swal from'sweetalert2';
import {API} from '../../Api'

const authActions = {
    makeNewUser: (usuario) => {
        return async (dispatch) => {
            try {
                const respuesta = await axios.post(`${API}user/signup`, usuario)///esto viaja al backend, va a router, busca la ruta
                if(!respuesta.data.success){
                    return respuesta.data
                } 
                dispatch({type: 'LOG_USER', payload: respuesta.data})//lo que me contesto el backend se lo mando al reducer
            }catch(errores){
                Swal.fire({
                    icon: 'error',
                    title: 'Ups!',
                    text: "Algo salio mal, intenta nuevamente!",
                    showConfirmButton: false,
                    timer: 4000
                    })
            }
        }
    },

    logInUser: user => {
        return async (dispatch) => {
            const respuesta = await axios.post(`${API}user/signin`,user)
            if(!respuesta.data.success) return respuesta.data;
            dispatch({type: 'LOG_USER', payload: respuesta.data})
        }
    },

    modifyUser: (formData) => {
        return async (dispatch, getState) => {
            const response = await axios.post(`${API}settings`, formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data' 
                }
            })
            dispatch({type: 'MODIFY_USER', payload: response.data})
        }
    },
    logFromLS: (token) => {
        return async (dispatch, getState) => {
            try{
                const response = await axios.post(`${API}user/ls/`, {token}, {
                
                    headers: {
                        Authorization: `Bearer ${token}`
                       
                    }
                })
                dispatch({type: 'LOG_USER', payload: response.data})
                
            }catch(error){
                if(error.response.status === 401) {
                    Swal.fire({
                        icon: 'error',
                        title: '¡CUIDADO!',
                        text: "No tienes permitido ingresar a la web",
                        showConfirmButton: false,
                        timer: 4000
                        })
                    localStorage.clear()
                    return true
                }
            }
        }
    },

    resetPassword: (email)=> {
        return async (dispatch) => {
            try{
                const response = await axios.post(`${API}user/reset-password`, {email})
                dispatch({type: 'RESET_PASSWORD'})
            }catch(error){
                Swal.fire({
                    icon: 'error',
                    title: 'Ups!',
                    text: "Algo salio mal, intenta nuevamente!",
                    showConfirmButton: false,
                    timer: 4000
                    })
            }
        }
    },

    newPassword: (email, password) => {
        return async(dispatch) => {
            try{
                const response = await axios.put(`${API}user/reset-password`, {email, password})
                dispatch({type: 'CHANGE_PASSWORD'})
            }catch(error){
                Swal.fire({
                    icon: 'error',
                    title: 'Ups!',
                    text: "Algo salio mal, intenta nuevamente!",
                    showConfirmButton: false,
                    timer: 4000
                    })
            }
        }
    },

    logOutUser: () => { //se usa en el header
        return async (dispatch) => {
            dispatch({type:'LOG_OUT_USER'})
        }
    },

}
export default authActions