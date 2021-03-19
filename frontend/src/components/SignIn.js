import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import authActions from '../redux/actions/authActions'
import GoogleLogin from 'react-google-login'
import Swal from 'sweetalert2';


const SignIn = (props) => {

    const [userLogueado, setUserLogueado] = useState({})
    const [visible, setVisible] = useState(false)

    const alertError = (error) => {
        Swal.fire({
            icon: 'error',
            title: '¡CUIDADO!',
            text: error,
            showConfirmButton: false,
            timer: 4000
        })
    }

    const alertSuccess = () => {
        Swal.fire({
            icon: 'success',
            title: 'Bienvenido',
            text: '¡Segui disfrutando de tus libros favoritos!',
            showConfirmButton: false,
            timer: 4000
        })
    }

    const readInput = e => { //receive the event
        const valor = e.target.value // capture the value
        const campo = e.target.name // capture the field
        setUserLogueado({//modify the user I have in the useState
            ...userLogueado,
            [campo]: valor
        })
    }

    const validateUser = async e => { // function that runs when you click the create user button
        e.preventDefault() //prevent reloading the page
        if (userLogueado.email === "" || userLogueado.password === "") {
            const text = 'Verifique que todos los campos esten llenos'
            alertError(text)
            return false
        }
        const respuesta = await props.logInUser(userLogueado)
        if (respuesta && !respuesta.success) {
            alertError(respuesta.mensaje)
        } else {
            alertSuccess()
        }
    }

    const responseGoogle = async (response) => {
        if (response.error) {
            const text = 'Algo salio mal con tu cuenta de Google, vuelve a intentar!'
            alertError(text)
        } else {
            const respuesta = await props.logInUser({
                email: response.profileObj.email,
                password: response.profileObj.googleId
            })
            if (respuesta && !respuesta.success) {
                alertError(respuesta.mensaje)
            } else {
                alertSuccess()
            }
        }
    }


    return (
        <div className="containerLogin">
            <div className="imagRegister"></div>
            <div className="registerInput" >
                <div className="login">
                    <h2>Iniciar Sesion</h2>
                    <input className="inputRegister" type="text" name="email" placeholder="Nombre de Usuario" onChange={readInput} />
                    <div className="a">
                        <input className="inputRegisterPassword" type={visible ? "text" : "password"} name="password" placeholder="Contraseña" onChange={readInput} />
                        <div className='ojito'><i className={visible ? "far fa-eye-slash" : "far fa-eye"} onClick={() => setVisible(!visible)}></i></div>
                    </div>
                    <button className="botonRegister" onClick={validateUser} >Iniciar sesion</button>
                    <GoogleLogin
                        clientId="1038057212104-nnvs147cdmm0l23842rfofjg32aqll0s.apps.googleusercontent.com"
                        buttonText="Iniciar sesion con google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
            </div>
            <div style={{ height: "50vh", width: "60vw" }}>
            </div>
            <Link to="/send-email"><h5>Olvidaste tu contraseña?</h5></Link>
        </div>
    )
}


const mapDispatchToProps = { // map the actions
    logInUser: authActions.logInUser
}

export default connect(null, mapDispatchToProps)(SignIn)