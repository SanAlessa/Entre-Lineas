import { connect } from "react-redux"
import { useState, useEffect } from "react"
import {Link} from "react-router-dom"
import bookActions from "../redux/actions/bookActions"
import Content from './Content'
import {Spinner} from 'reactstrap'


const ModifyChapter = (props) => {
  const [title, setTitle] = useState('')
  const [continuar, setContinuar] = useState(false)
  const id = props.match.params.id
  const chapterId =props.match.params.chapterId
  const newChapter = props.match.url==='/new-book/:id'
  var filtro = props.books.filter(book=> book._id === id)
  var indexPage = parseInt(props.match.params.index)


  useEffect(()=>{
    if(filtro.length>0){
    setTitle(filtro[0].chapters[indexPage].title)}
  },[filtro.length])


  const sendTitle=async ()=>{
    setContinuar(!continuar)
    props.modifyChapterTitle(title, id, chapterId, props.loggedUser.token)
  }
  console.log(title)
  return (
    <>
    {filtro.length === 0 ?
        <div className="cajaSpinner">
          <div className="cajitaSpinner">
            <Spinner className="spinner" />
          </div>
        </div>
        :
      <section className="chapter">
      <div className="imag-form-chapter"></div>
      <div className="frase-form">
        <div className="frase-chapter">
          <h4>« ¡Atrapá al lector desde la primera página y lográ que tu historia este entre las más populares! »</h4>
        </div>
        <div className="container-form-chapter">
          <div className='capitulo' style={{display:'flex',flexDirection:'column',alignItems:'center',marginTop:'2vh'}}>
            <h3>{newChapter ? 'Agregar el nombre de tu nuevo capítulo' : 'Modificar título del capítulo'}</h3>
            <div className="line">
              <input className="input-chapter" type="text" name="title" id="title"  placeholder="Capitulo" value={title} onChange={(e)=>setTitle(e.target.value)} />
            </div>
            {!continuar && <button className="buttonNewChapter" onClick={sendTitle}>Listo!</button>}
          </div>
          {continuar && 
          <>
          <div className="form-chapter">
          {filtro[0].chapters[indexPage].chapter.map(content=><Content bookId={id} chapterId={chapterId} content={content} />)}
          </div>
          <div style={{display:'flex', width:'46vw', justifyContent:'center', marginBottom:'10vh'}}>
              <Link to={`/modify-book/${id}`} id={id}><button className="buttonNewChapter"><span>Volver</span></button></Link>
          </div>
          <p style={{fontSize:'2.2vh'}}> * Cada vez que aprietes la tecla "Enter" se crea un nuevo párrafo.</p>
          <p style={{fontSize:'2.2vh'}}>* Añades el capitulo a tu libro y sigues escribiendo!</p>
          <p style={{marginBottom:'3vh', fontSize:'2.2vh'}}> * Al hacer click en "Finalizar" tu libro se da por terminado y puedes agregarle foto de portada!</p></>}
        </div>
      </div>
    </section>}
    </>
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


export default connect(mapStateToProps, mapDispatchToProps)(ModifyChapter)