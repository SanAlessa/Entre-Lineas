import { connect } from "react-redux"
import { useState, useEffect } from "react"
import {Link} from "react-router-dom"
import bookActions from "../redux/actions/bookActions"
import Swal from "sweetalert2";
import Content from './Content'


const NewChapter = (props) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [chapter, setChapter] = useState([])
  const [continuar, setContinuar] = useState(false)
  const id = props.match.params.id
  const chapterId =props.match.params.chapterId
  console.log(chapterId)
  const newChapter = props.match.url==='/new-book/:id'
  var filtro = props.books.filter(book=> book._id === id)
  var indexPage = parseInt(props.match.params.index)

  console.log(filtro[0].chapters[indexPage])

  useEffect(()=>{
    setTitle(filtro[0].chapters[indexPage].title)
  },[])


  const sendTitle=async ()=>{
    setContinuar(!continuar)
    props.modifyChapterTitle(title, chapterId, props.loggedUser.token)
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
  console.log(filtro[0].chapters[indexPage])
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
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginTop:'8vh'}}>
            <h3>{newChapter ? 'Agregar el nombre de tu nuevo capítulo' : 'Modificar título del capítulo'}</h3>
            <div className="line">
              <input className="input-chapter" type="text" name="title" id="title" disabled={continuar && true} placeholder="Capitulo" value={title} onChange={(e)=>setTitle(e.target.value)} />
            </div>
            {!continuar && <button onClick={sendTitle}>Listo!</button>}
          </div>
          {continuar && 
          <>
          <div className="form-chapter">
          {filtro[0].chapters[indexPage].chapter.map(content=><Content bookId={id} chapterId={chapterId} content={content} />)}
            <textarea type="text" className="textarea-chapter" name="content" id="content" cols="20" rows="5" placeholder="Comenza a escibir tu historia..." 
            onKeyPress={keyPress} style={{ resize: 'none', width: '90%' }} value={content.content} onChange={(e)=>setContent({content:e.target.value})}></textarea>
          </div>
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
    books: state.bookR.books
  }
}

const mapDispatchToProps = {
  modifyChapterTitle: bookActions.modifyChapterTitle,
  sendContent: bookActions.sendContent,
  getBooks: bookActions.getBooks,
}


export default connect(mapStateToProps, mapDispatchToProps)(NewChapter)