import { connect } from "react-redux"
import { useState } from "react"
import bookActions from "../redux/actions/bookActions"
import Swal from'sweetalert2';


const FinishBook=(props)=>{
  const id = props.match.params.id
  console.log(props.match.url)
  const [book, setBook] = useState({})
  const [fileUrl, setFileUrl] = useState(null)

  const processImage = () => {
    const imagen = document.getElementById('image').files[0]
    const foto = URL.createObjectURL(imagen)
    setFileUrl(foto)
  }

  const selectImag = (e) => {
    processImage()
    var value = e.target.value
    const prop = e.target.name
    if (prop ==='image') value = e.target.files[0]
    setBook({
      ...book,
      [prop]:value,
    })
  }

  const send=()=>{
    const formData = new FormData()
    formData.append('image', book.image)
    formData.append('id', id)
    console.log(book.image)
    var filesExtension = ['.jpg', '.png', '.jpeg']
    if(book.image && filesExtension.some(file=>book.image.name.includes(file))){
      props.addImage(formData, props.loggedUser.token)
      Swal.fire({
        icon: 'success',
        title: 'Libro guardado con exito!',
        showConfirmButton: false,
        timer: 4000
      })
    }else{
      Swal.fire({
        icon: 'error',
       title: 'Extension de archivo no permitida.',
        showConfirmButton: false,
        timer: 4000
      })
    }
  }

  return (
    <section className="conteiner-finishBook">
      <div className="imagFinishBook"></div>
      <div className="form-finishBook">
        <div className="inputAndButtonFinishBook">
          <div className="finishBook">
            <h3>{props.match.url==='/finish-book/:id' ? 'Elegir foto de portada' : 'Cambiar foto de portada!'}</h3>
            <div className="selectImagPort" style={{cursor: 'pointer'}}>
              <label style={{cursor: 'pointer'}} for="image">
                <i style={{cursor: 'pointer'}} for="image" className="fas fa-hand-pointer"></i>
                <h6 style={{cursor: 'pointer'}}>Click para seleccionar Imagen</h6>
              </label>
            </div>
            <input className="imagePort" type="file" name="image" id="image" onChange={selectImag}/>
            <button onClick={send} className="buttonFinshBook"><span>TERMINAR EL LIBRO</span></button>
          </div>
          <div className="portadaImage" style={{boxShadow: '0px 5px 5px rgba(0,0,0,0.2)', backgroundImage: `url('${fileUrl}')`}}></div>
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
  addImage: bookActions.addImage
}


export default connect(mapStateToProps, mapDispatchToProps)(FinishBook)