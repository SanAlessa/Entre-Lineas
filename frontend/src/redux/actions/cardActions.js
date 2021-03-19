import axios from 'axios'
import Swal from'sweetalert2';
import {API} from '../../Api'

const cardActions = {
    getCardsCategories: () => {
        return async (dispatch, getState) => {
            try{
                const responseCategories = await axios.get(`${API}genre`)
                dispatch(
                    {
                        type: 'GET_CARDS_GENRES',
                        payload: responseCategories.data.response
                    }
                )
            }catch(err){
                Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: "Algo salio mal. intente mas tarde.",
                    showConfirmButton: false,
                    timer: 4000
                })
            }
        }
    }
}

export default cardActions