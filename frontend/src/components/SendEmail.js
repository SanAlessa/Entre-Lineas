import React, {useState} from 'react'
import { connect } from 'react-redux'
import authActions from '../redux/actions/authActions'
import Swal from 'sweetalert2'


const SendEmail = ( props ) => {

    const [email, setEmail] = useState('')
    const [errores, setErrores] = useState ([])
 
    const checkIfInputsAreEmpty = email===''

    const validateUser = async e => { // function that runs when you click the create user button
        e.preventDefault() //prevent reloading the page
        if(checkIfInputsAreEmpty){
            Swal.fire({
                icon: 'error',
                title: '¡CUIDADO!',
                text: "No tienes permitido ingresar a la web",
                showConfirmButton: false,
                timer: 4000
                })
            return true
        }
        setErrores([])

        const respuesta = await props.resetPassword(email)
        if(respuesta && !respuesta.success){
            setErrores(respuesta.errores.details)
        }else{
            Swal.fire({
                icon: 'success',
                title: '¡Listo!',
                text: "Revisa tu mail por favor!",
                showConfirmButton: false,
                timer: 4000
                })
        }
    }


return (
    <div className="containerRegister">
        <div className="imagRegister"></div>
            <div className="registerInput" >
                <div className= "register">
                    <h2>Solicitud de restablecimiento de contraseña</h2>
                    <div className="userNameAndPassword">
                        <input className="inputRegister" type="text" name="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value.trim())} />
                    </div>
                    <button className="botonRegister" onClick={validateUser} >Recuperar contraseña!</button>
                </div>
            </div>
        <div style={{height:"50vh", width:"60vw"}}>
            {/* {errores.map(error => alert(error))} */}
        </div>
    </div>
        )
    }

const mapDispatchToProps = { // map the actions
   resetPassword : authActions.resetPassword //mapDispachToProps object that has an action value
}

export default connect(null,mapDispatchToProps)(SendEmail)
