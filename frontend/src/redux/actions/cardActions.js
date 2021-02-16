import axios from 'axios'

const cardActions = {
    getCardsCategories: () => {
        return async (dispatch, getState) => {
            try{
                const responseCategories = await axios.get('http://localhost:4000/api/genre')
                console.log('Estoy buscando los géneros')
                dispatch(
                    {
                        type: 'GET_CARDS_GENRES',
                        payload: responseCategories.data.response
                    }
                )
                console.log(responseCategories)
            }catch(err){
                console.log(err)
            }
        }
    }
}

export default cardActions