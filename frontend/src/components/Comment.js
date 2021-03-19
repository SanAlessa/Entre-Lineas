import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Button, Input } from 'reactstrap'
import bookActions from '../redux/actions/bookActions'

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
        await props.modComment(value, props.comment._id, props.id, props.loggedUser.token)
        setInput(!input)
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
                    <h6 className="index">{props.comment.firstName}</h6>
                </div>
                    {!input ?
                    <div className="contentComment">
                        <p>{props.comment.content}</p>
                    </div>
                    :
                    <div className="d-flex">
                        <Input className="comment" id="comment" type="text" placeholder="Edit comment" onChange={(e) => {setValue(e.target.value)}} onKeyPress={keyPress}/>
                        <Button onClick={modiComment}><i className="fas fa-paper-plane"></i></Button>
                    </div>}
                {props.loggedUser && loggedUser === props.comment.userId &&
                <div className="botonesEditAndBorrar">
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