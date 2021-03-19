import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Button, Input } from 'reactstrap'
import bookActions from '../redux/actions/bookActions'
import Swal from'sweetalert2';

const Comment = (props) => {
    const [value, setValue] = useState('')
    const [input, setInput] = useState(false)
    const [loggedUser, setLoggedUser] = useState('')

    useEffect(() => {
        if (props.loggedUser) {
            setLoggedUser(props.loggedUser.id)
        }
    }, [])
    
    const deleteC = async (e) => {
        await props.deleteComments(props.id, props.comment._id, props.loggedUser.token)
    }
    const modiComment = async (e) => {
        if (value !== ""){
        await props.modComment(value, props.comment._id, props.id, props.loggedUser.token)
        setInput(!input)}
        else {
            Swal.fire({
                icon: 'error',
                title: '¡Y el comentario!',
                text: 'No hay nada para editar',
              })
            setInput(!input)
        }
    }

const keyPress = e => {
    if (e.key === 'Enter') {
        modiComment()
    }
}
    return (
        <div className="containerComment">
            <div className="containerComments">
                <div className="userPicAndName">
                    {props.comment.userPic ?
                    <img src={props.comment.userPic} className="rounded-circle" alt="..."/> :
                    <div className="dropDownPic" >{props.comment.firstName.toUpperCase().substr(0, 1)}</div>}
                    <h6 className="index text-center">{props.comment.firstName}</h6>
                </div>
                    {!input ?
                    <div className="contentComment text-center">
                        <p>{props.comment.content}</p>
                    </div>
                    :
                    <div className="botonesEditAndBorrar">
                        <Input className="comment" id="comment" type="text" placeholder="Edit comment" onChange={(e) => {setValue(e.target.value)}} onKeyPress={keyPress}/>
                        
                        <Button onClick={() => {setInput(!input)}}><i class="far fa-times-circle"></i></Button>
                        <Button onClick={modiComment}><i className="fas fa-paper-plane"></i></Button>
                    </div>}
                {props.loggedUser && loggedUser === props.comment.userId && !input &&
                <div className="botonesEditAndBorrar d-flex">
                    <Button onClick={deleteC}><i className="far fa-trash-alt"></i></Button>
                    <Button onClick={() => {setInput(!input)}}><i className="far fa-edit"></i></Button>
                </div>}
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
    loggedUser: state.auth.loggedUser
    }
  }

const mapDispatchToProps = {
    deleteComments: bookActions.deleteComment,
    modComment: bookActions.modComment

}
export default connect(mapStateToProps, mapDispatchToProps)(Comment)