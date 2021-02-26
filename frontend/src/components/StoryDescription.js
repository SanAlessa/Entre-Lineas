import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux'
import bookActions from "../redux/actions/bookActions"
import { Link } from "react-router-dom"
import { Button, Input, Spinner} from 'reactstrap'
import Comment from './Comment'
import Swal from'sweetalert2';

const StoryDescription = (props)=>{
    const [reload, setReload] = useState(false)
    const [value, setValue] = useState('')
    const [voted, setVoted] = useState('')
    var namePage = props.match.params.id
    var filtro = props.books.filter(libro => libro._id === namePage)
    useEffect(() => {
        if(props.loggedUser) {
            setVoted(props.loggedUser.id)
        }
        if(props.comments.comments) {
            props.comments.comments.map(comment => console.log(comment))
        }
    }, [props.loggedUser])
    const enviar =  async () => {
        if (value !== ""){
        await props.addComment(value, filtro[0]._id, props.loggedUser.token)
        setValue("")}
        else {
            Swal.fire({
                icon: 'error',
                title: '¡Y el comentario!',
                text: 'No hay ningun comentario',
              })

        }
    }

    const votes = async () => {
        props.vote(filtro[0]._id, props.loggedUser.token)
        filtro[0].stars.push(props.loggedUser.id)
        setReload(!reload)
    }
    const dismissVote = async () => {
        props.dismissVote(filtro[0]._id, props.loggedUser.token)
        filtro[0].stars.pop(props.loggedUser.id)
        setReload(!reload)
    }
    const keyPress = e => {
        if (e.key === 'Enter') {
        enviar()
        }
    }
    const redirect = () =>{
        Swal.fire({
            icon: 'error',
            title: '¡Lo sentimos!',
            text: 'Esta historia todavia no tiene capitulos',
          })
        props.history.push(`/stories/${filtro[0].genre}`)
    }
    const alert =()=>{ 
        Swal.fire({
            icon: 'error',
            title: '¡Lo sentimos!',
            text: 'Primero ingresa a tu cuenta'
          })
    }
    return(
        <>
        {filtro.length === 0 ? 
            <div className="cajaSpinner">
            <div className="cajitaSpinner">
            <Spinner  className="spinner"/>
            </div>
            </div>: 
      <> <div className="conteinerResp">
                <div className="container-image-info-book">
                    <div className="imag-book-story-description" style={{backgroundImage:`url('${filtro[0].image}')`}}></div>
                    <div className="container-info-book">
                        <h2>{filtro[0].title}</h2>
                        <h5>{filtro[0].genre}</h5>
                        <div className="views-stars-chapters">
                            <div><h5> <i className="far fa-eye"></i> {filtro[0].views} </h5></div>
                            <div><h5> <i class="far fa-star"></i> {filtro[0].stars.length}</h5></div>
                            <div><h5> <i class="fas fa-list-ul"></i> {filtro[0].chapters.length}</h5></div>
                        </div>
                        <div>
                            <h5>{filtro[0].user.firstname} {filtro[0].user.lastname}</h5>
                        </div>
                        <div className="stars">
                            {filtro[0].chapters.length > 0
                            ? <Link to={`/book/${filtro[0]._id}/${filtro[0].chapters[0]._id}/${0}`}>
                            <button className="BotonLeer">Leer</button></Link> : redirect()}
                            {filtro[0].stars.includes(voted) 
                            ?
                            <button className="BotonLeer" onClick={props.loggedUser && dismissVote}>Quitar Voto <i class="fas fa-star"></i></button>
                            : 
                            <button className="BotonLeer" onClick={props.loggedUser ? votes : ()=> alert()}>Depositar voto <i class="far fa-star"></i></button>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="comment-table-container">
                <div>
                    <div className="table-title-container">
                        <h2>Tabla de Contenidos</h2>
                    </div>
                    <div className="table-containe">
                        {filtro[0].chapters.map((chapter, index) => {
                            return (
                                <Link to={`/book/${filtro[0]._id}/${chapter._id}/${index}`}><button><p>{chapter.title}</p></button></Link>
                            )
                        })}
                    </div>
                </div>
                <div className="coments-container-storyDescription">
                    <div className="comments-storyDescription">
                        {props.comments.comments ?
                        <div>{props.comments.comments.length > 0 ? props.comments.comments.map(comment => {
                            return <Comment comment={comment} key={comment._id} id={filtro[0]._id}/>
                        }): 
                        <h2 className="text-center bg-white w-100">Sin Comentarios</h2>}
                        </div>
                        : filtro[0].comments.length > 0 ?
                        <div>
                            {(filtro[0].comments.map(comment => {
                                return <Comment comment={comment} key={comment._id} id={filtro[0]._id}/>
                            }))}
                        </div> :
                        <h2 className="text-center bg-white w-100">Sin Comentarios</h2>}
                    </div>
                    <div>
                        {props.loggedUser ?
                        <div>
                            <div className="inputButtomEnvComment">
                                <Input className="comment" id="comment" type="text" placeholder="Comenta!" value={value} onChange={(e)=> setValue(e.target.value)} onKeyPress={keyPress}/>
                                <Button onClick={enviar}><i class="far fa-paper-plane"></i></Button>
                            </div>
                        </div> :
                        <div className="d-flex justify-content-center">
                            <Input className="comment w-50 text-center" disabled type="text" placeholder="Primero Regístrate!" />
                        </div>}
                    </div>
                </div>
            </div>
            </>}
        </>
    )
}

const mapStateToProps = state => {
    return {
        loggedUser: state.auth.loggedUser,
        books: state.bookR.books,
        comments: state.bookR.comment
    }
  }

const mapDispatchToProps = {
    addComment: bookActions.addComment,
    vote: bookActions.vote,
    dismissVote: bookActions.dismissVote,
    incViews: bookActions.incViews

}
export default connect(mapStateToProps, mapDispatchToProps)(StoryDescription);