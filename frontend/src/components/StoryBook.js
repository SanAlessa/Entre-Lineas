import {useEffect} from 'react'
import {connect} from 'react-redux'
import { Link } from "react-router-dom"
import {Spinner} from 'reactstrap'

const StoryBook = (props)=>{
    var namePage = props.match.params.id
    var filtro = props.books.filter(libro=> libro._id === namePage)
    var indexPage = parseInt(props.match.params.index)

    useEffect(()=>{
        window.scrollTo(0,0)
    },[])

    return(
        <>
            {filtro.length === 0 ? 
            <div className="cajaSpinner">
            <div className="cajitaSpinner">
              <Spinner  className="spinner"/>
            </div>
          </div>
            :
            <div className="containerCap">
            <div className="containerTitleAndUser">
                <div className="titleCap">
                    <p>{filtro[0].chapters[indexPage].title}</p>
                    <div style={{width:'30vh', display:'flex',justifyContent:'space-between'}}>
                        <h5><i className="far fa-eye"></i> {filtro[0].views} </h5>
                        <h5><i className="far fa-star"></i> {filtro[0].stars.length}</h5>
                        <h5><i className="fas fa-list-ul"></i> {filtro[0].chapters.length}</h5>
                    </div>
                </div>
                <div className="containerParrafosAndButton">
                    <div className="containerParrafos">
                        {filtro[0].chapters[indexPage].chapter.map(parrafo=>{
                            return(
                                <p key={parrafo.content}>{parrafo.content}</p>
                            )
                        })}
                    </div>
                    {indexPage === filtro[0].chapters.length -1 ? <Link to={`/story/${filtro[0]._id}`}><button><span>Volver al libro</span></button></Link> : <Link to={`/book/${filtro[0]._id}/${filtro[0].chapters[indexPage]._id}/${indexPage+1}`}><button><span>Sigue leyendo la parte siguiente</span></button></Link>}
                </div>
            </div>
        </div>}
        </>
    )
    
}
const mapStateToProps = state => {
    return {
        books: state.bookR.books,

    }
  }

export default connect(mapStateToProps)(StoryBook);