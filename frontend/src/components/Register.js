import React, {useState} from 'react'
import { connect } from 'react-redux'
import authActions from '../redux/actions/authActions'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login';
import Swal from'sweetalert2';


const Register = ( props ) => {

    const [usuario, setUsuario] = useState({
        firstname:'',lastname:'',birthday:'',email:'',password:'', image:''
    })
    const [visible, setVisible] = useState(false)

    const readInput = e => { //receive the event
        const valor = e.target.value // capture the value
        const campo = e.target.name // capture the field

        setUsuario ({ //modify the user I have in the useState
            ...usuario,
            [campo]:valor
        });
    }

    const checkIfInputsAreEmpty = usuario.firstname === ''|| usuario.lastname  === ''|| usuario.birthday === ''|| usuario.email === ''|| usuario.password === '';

    const alertError = (error) =>{
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

    const validateUser = async e => { // function that runs when you click the create user button
        e.preventDefault() //prevent reloading the page
        if(checkIfInputsAreEmpty){
            const text = 'Verifique que todos los campos esten llenos'
            alertError(text)
            return false
        }

        const respuesta = await props.makeNewUser(usuario)
        if(respuesta && !respuesta.success){
            respuesta.errores.map(respuesta=>alertError(respuesta.message))
        }else{
            alertSuccess()
        }
    }

    const responseGoogle = async (response) => {
        if(response.error){
            const text = 'Algo salio mal con tu cuenta de Google, vuelve a intentar!'
            alertError(text)
        }else{
            const respuesta = await props.makeNewUser({
                firstname: response.profileObj.givenName,
                lastname: response.profileObj.familyName,
                email: response.profileObj.email,
                password:response.profileObj.googleId,
                image: response.profileObj.imageUrl
            })
        if(respuesta && !respuesta.success){
            alertError(respuesta.error)
        }else{
            alertSuccess()
        }
    }
}



return (
    <div className="containerRegister">
        <div className="imagRegister"></div>
            <div className="registerInput" >
                <div className= "register">
                    <h2>Crear Usuario</h2>
                    <div className="nameAndLastName">
                        <input className="inputRegister" type="text" name="firstname" placeholder="Nombre" onChange={readInput}/>
                        <input className="inputRegister" type="text" name="lastname" placeholder="Apellido" onChange={readInput}/>
                    </div>
                    <input  className="inputRegister" type="date" min="1950-01-01" max="2021-2-31" name="birthday" placeholder="fechas de nacimiento" onChange={readInput}/>
                    <div className="userNameAndPassword">
                        <input className="inputRegister" type="text" name="email" placeholder="Email" onChange={readInput} />
                        <div style={{display:'flex',alignItems:'center'}}>
                            <input className="inputRegister" type={visible ? "text" : "password"} name="password" placeholder="Contraseña" onChange={readInput} />
                            <i className={visible ? "far fa-eye-slash" : "far fa-eye"} onClick={()=>setVisible(!visible)}></i>
                        </div>
                    </div>
                    <p>*La contraseña debe contener al menos un número.</p>
                    <button className="botonRegister" onClick={validateUser} >Crear usuario</button>
                        <GoogleLogin
                            clientId="1087968275357-m12u0vuij7mp2vs76frlkn5of8ae1are.apps.googleusercontent.com"
                            buttonText="Crear usuario con google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                </div>
            </div>
        <div style={{height:"50vh", width:"60vw"}}>
        </div>
    </div>
        )
    }

const mapDispatchToProps = { // map the actions
    makeNewUser: authActions.makeNewUser //mapDispachToProps object that has an action value
}

export default connect(null,mapDispatchToProps) (Register)
