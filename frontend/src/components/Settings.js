import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import authActions from '../redux/actions/authActions'
import Swal from'sweetalert2';


const Settings = (props) => {
  const [change, setChange] = useState(false)
  const [email, setEmail] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [birthday, setBirthday] = useState('')
  const [user, setUser] = useState({firstname:'', lastname:'', email:'', birthday:''})
  const [fileUrl, setFileUrl] = useState('')
  const [pathImage, setPathImage] = useState('')

  useEffect(()=>{
    if(!props.loggedUser){
      props.history.push('/search')
      Swal.fire({
        icon: 'error',
        title: '¡Ups!',
        text: 'Algo salio mal, te pedimos disculpas',
        showConfirmButton: false,
        timer: 4000
        })
    }
  },[])

  const readInput = (e) => {
    var value = e.target.value
    const prop = e.target.name
    if (prop ==='image') value = e.target.files[0]
    setUser({
      ...user,
      [prop]:value,
    })
  }
  console.log(user)

  const edit = (e) => {
    e.preventDefault()
    setChange(!change)
  }


  const onFileChange= e =>{
    if(e.target.files && e.target.files.length > 0){
        const file = e.target.files[0]
        if(file.type.includes('image')){
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload= function load(){
                setPathImage(reader.result)
            }
            setFileUrl(file)
        }else{
            console.log('tuvimos un error')
        }
        console.log(file)
        console.log(fileUrl)
    }
  }
  const alertError = (error) =>{
    Swal.fire({
        icon: 'error',
        title: '¡CUIDADO!',
        text: error,
        showConfirmButton: false,
        timer: 4000
        })
  }

  const send = e => {
    e.preventDefault()
    const formData = new FormData()
    console.log(fileUrl)
    formData.append('email', user.email.trim())
    formData.append('firstname', user.firstname.trim())
    formData.append('lastname', user.lastname.trim())
    formData.append('birthday', user.birthday)
    formData.append('image', fileUrl)
    formData.append('id', props.loggedUser.id)
    console.log(fileUrl)
    var filesExtension = ['.jpg', '.png', '.jpeg']

    if(user.email==='' || user.firstname=== '' || user.lastname === ''){
      const text = 'Verifique que todos los campos esten llenos'
      alertError(text)
    }else if(fileUrl && filesExtension.some(file=>fileUrl.name.includes(file))){
      props.modifyUser(formData)
      Swal.fire({
        icon: 'success',
        title: 'Listo!',
        text: 'Ajustes guardados',
        showConfirmButton: false,
        timer: 4000
      })
    }else {
      const text = 'Extension de archivo no permitida'
      alertError(text)
    }
  }

  return (
    <section className="settings">
      <div className="imagSettings"></div>
      <div className="container-form-settings">
        <form className="form-settings">
          <div className="tituloIcon">
            <div className="iconoAjus"></div>
              <h4>Ajustes de usuario</h4>
              <button className="settingsEdit" onClick={edit}>
                <i className="fas fa-pencil-alt editPencil" style={{color: 'white'}}></i>
                <p>Comenzar</p>
              </button>
          </div>
          <div className="line">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" disabled={!change ? true : false} onChange={readInput} />
          </div>
          <div className="line">
            <label htmlFor="firstname">Nombre</label>
            <input type="text" name="firstname" id="firstname" disabled={!change ? true : false}  onChange={readInput} />
          </div>
          <div className="line">
            <label htmlFor="lastname">Apellido</label>
            <input type="text" name="lastname" id="lastname" disabled={!change ? true : false}  onChange={readInput} />
          </div>
          <div className="line">
            <label htmlFor="birthday">Fecha de nacimiento</label>
            <input type="date" name="birthday" id="birthday" disabled={!change ? true : false}  onChange={readInput} />
          </div>
          <div className="lineImgUser">
              <div className="selectImagPerfil" style={{cursor: 'pointer'}}>
                <label htmlFor="image" for="image" style={{cursor: 'pointer'}}>
                  <i style={{cursor: 'pointer'}} for="image" class="fas fa-hand-pointer"></i>
                  <h6 style={{cursor: 'pointer'}} >Click para seleccionar Imagen</h6>
                </label>
              </div>
            <input className="imagePort" type="file" name="image" id="image" onChange={onFileChange}/>
          </div>
          <div className="line">
            <div className="buttonSettings" onClick={send}><span>Confirmar cambios</span></div>
          </div>
        </form>
        <div className="userImage" style={{width: '20vw', height: '50vh', boxShadow: '0px 5px 5px rgba(0,0,0,0.2)', backgroundImage: `url('${pathImage}')`}}>
      </div>
    </div>
    </section>
  )
}

const mapStateToProps = state => {
  return {
    loggedUser: state.auth.loggedUser
  }
}

const mapDispatchToProps = {
  modifyUser: authActions.modifyUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)