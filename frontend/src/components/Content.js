import {connect} from 'react-redux'
import {useState, useEffect} from 'react'
import bookActions from "../redux/actions/bookActions"

const Content =(props)=>{
  const [visible, setVisible] = useState(false)
  const [updatedContent, setUpdatedContent] = useState('')
  const {content, _id} = props.content
  const {bookId, chapterId} = props

  useEffect(()=>{
    setUpdatedContent(content)
  },[])

  const edit =(e)=> {
    setVisible(!visible)
    setUpdatedContent(content)
  }
  const modifyContent= async () => {
    await props.modifyContent(updatedContent, _id, chapterId, bookId, props.loggedUser.token)
    setVisible(!visible)
  }
  const deleteContent =async()=>{
    await props.deleteContent(_id, chapterId, bookId, props.loggedUser.token)
  }
  const keyPress=(e)=>{
    e.key==='Enter' && modifyContent()
  }
  return (
    <div>
      {visible ?
      <div className="form-chapter">
        <textarea className="textarea-chapter" name="updatedContent" id="updatedContent" value={updatedContent} onChange={(e)=>setUpdatedContent(e.target.value)} style={{resize: 'none', width: '100%'}}></textarea>
        <i onClick={modifyContent} onKeyPress={keyPress} className="fas fa-sign-in-alt"></i>
        <i onClick={()=>setVisible(!visible)} className="far fa-window-close"></i>
      </div>
      :
      <div>
        <textarea name="updatedContent" id="updatedContent" disabled={!visible && true} value={updatedContent} style={{resize: 'none', width: '100%'}}></textarea>
        <i onClick={edit} className="far fa-edit"></i>
        <i onClick={deleteContent} className="fas fa-eraser"></i>
      </div>
      }
    </div>
  )
}

const mapStateToProps = state =>{
  return {
    loggedUser: state.auth.loggedUser
  }
}

const mapDispatchToProps = {
  modifyContent: bookActions.modifyContent,
  deleteContent: bookActions.deleteContent
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)