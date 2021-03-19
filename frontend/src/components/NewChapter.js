import { connect } from "react-redux"
import { useState, useEffect } from "react"
import {Link} from "react-router-dom"
import bookActions from "../redux/actions/bookActions"
import Swal from "sweetalert2";


const NewChapter = (props) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [chapter, setChapter] = useState([])
  const [continuar, setContinuar] = useState(false)
  const id = props.match.params.id

  const sendTitle=async ()=>{
    setContinuar(!continuar)
    props.addChapter(title, id, props.loggedUser.token)
  }
  
  const keyPress=async (e)=>{
    if(e.key==='Enter') {
      setChapter([
        ...chapter, content
      ])
      if(content.content===''){
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No puedes añadir un capitulo vacío!',
          showConfirmButton: true,
          timer: 2000
        })
      }
      props.sendContent(content, title, id, props.loggedUser.token)
      setContent('')
      setContent({content:''})
      e.preventDefault()
      
    }
  }
  console.log(content)
  const send = async (e) => {
    e.preventDefault()
    setChapter('')
    setTitle('')
    setContinuar(!continuar)
      Swal.fire({
        icon: 'success',
        title: 'Listo',
        text: '¡Nuevo capitulo creado!',
        showConfirmButton: true,
        timer: 2000
      })
  }
  return (
    <section className="chapter">
      <div className="imag-form-chapter"></div>
      <div className="frase-form">
        <div className="frase-chapter">
          <h4>« ¡Atrapá al lector desde la primera página y lográ que tu historia este entre las más populares! »</h4>
        </div>
        <div className="container-form-chapter">
          <div className="capitulo" style={{display:'flex',flexDirection:'column',alignItems:'center',marginTop:'2vh'}}>
            <h3>Agregar el nombre de tu nuevo capítulo</h3>
            <div className="line">
              <input className="input-chapter" type="text" name="title" disabled={continuar && true} id="title" placeholder="Capitulo" value={title} onChange={(e)=>setTitle(e.target.value)} />
            </div>
            {!continuar && <button className="buttonNewChapter" onClick={sendTitle}>Listo!</button>}
          </div>
          {continuar && 
          <>
          <div className="form-chapter">
            {chapter.length > 0 && <div className="chapterSended">
              {chapter.map(content=> <textarea disabled style={{resize: 'none', width: '100%'}} >{content.content}</textarea>)}</div>}
          </div>
            <textarea type="text" className="textarea-chapter" name="content" id="content" cols="20" rows="5" placeholder="Comenza a escibir tu historia..." 
            onKeyPress={keyPress} style={{ resize: 'none', width: '90%' }} value={content.content} onChange={(e)=>setContent({content:e.target.value})}></textarea>
          <div style={{display:'flex', width:'46vw', justifyContent:'space-between', marginBottom:'10vh'}}>
              <button className="buttonNewChapter" onClick={send}><span>Añadir capitulo al libro!</span></button>
              <Link to={`/finish-book/${id}`} id={id}><button className="buttonNewChapter"><span>Finalizar</span></button></Link>
          </div>
          <p style={{fontSize:'2.2vh'}}> * Cada vez que aprietes la tecla "Enter" se crea un nuevo párrafo.</p>
          <p style={{fontSize:'2.2vh'}}>* Añades el capitulo a tu libro y sigues escribiendo!</p>
          <p style={{marginBottom:'3vh', fontSize:'2.2vh'}}> * Al hacer click en "Finalizar" tu libro se da por terminado y puedes agregarle foto de portada!</p></>}
        </div>
      </div>
    </section>
  )
}

const mapStateToProps = state => {
  return {
    loggedUser: state.auth.loggedUser,
  }
}

const mapDispatchToProps = {
  addChapter: bookActions.addChapter,
  sendContent: bookActions.sendContent,
  getBooks: bookActions.getBooks,
}


export default connect(mapStateToProps, mapDispatchToProps)(NewChapter)