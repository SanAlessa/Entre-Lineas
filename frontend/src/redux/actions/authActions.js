import axios from 'axios'
import Swal from'sweetalert2';


const authActions = {
    makeNewUser: (usuario) => {
        console.log(usuario)
        return async (dispatch) => {
            try {
                const respuesta = await axios.post('http://localhost:4000/api/user/signup', usuario)///esto viaja al backend, va a router, busca la ruta
                if(!respuesta.data.success){
                    return respuesta.data
                } 
                dispatch({type: 'LOG_USER', payload: respuesta.data})//lo que me contesto el backend se lo mando al reducer
            }catch(errores){
                console.log(errores)
            }
        }
    },

    logInUser: user => {
        return async (dispatch) => {
            const respuesta = await axios.post('http://localhost:4000/api/user/signin',user)
            if(!respuesta.data.success) return respuesta.data;
            dispatch({type: 'LOG_USER', payload: respuesta.data})
            console.log(respuesta.data)
        }
    },

    modifyUser: (formData) => {
        console.log(formData)
        return async (dispatch, getState) => {
            const response = await axios.post(`http://localhost:4000/api/settings`, formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data' 
                }
            })
            dispatch({type: 'MODIFY_USER', payload: response.data})
            console.log(response.data)
        }
    },
    logFromLS: (token) => {
        return async (dispatch, getState) => {
            try{
                const response = await axios.post('http://localhost:4000/api/user/ls/', {token}, {
                
                    headers: {
                        Authorization: `Bearer ${token}`
                       
                    }
                })
                dispatch({type: 'LOG_USER', payload: response.data})
                
            }catch(error){
              
               
               
            }
        }
    },

    resetPassword: (email)=> {
        return async (dispatch) => {
            try{
                const response = await axios.post('http://localhost:4000/api/user/reset-password', {email})
                dispatch({type: 'RESET_PASSWORD'})
                console.log(response.data)
            }catch(error){
                console.log(error)
            }
        }
    },

    newPassword: (email, password) => {
        return async(dispatch) => {
            try{
                const response = await axios.put('http://localhost:4000/api/user/reset-password', {email, password})
                dispatch({type: 'CHANGE_PASSWORD'})
                console.log(response.data)
            }catch(error){
                console.log(error)
            }
        }
    },

    logOutUser: () => { //se usa en el header
        return async (dispatch) => {
            dispatch({type:'LOG_OUT_USER'})
        }
    },

    sendForgotPassword: () => {

    },

    makeNewPassword: () => {
        
    }
}
export default authActions