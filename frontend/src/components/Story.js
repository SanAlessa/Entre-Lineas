import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import bookActions from '../redux/actions/bookActions'
const Story=(props)=>{
    const views =()=>{
        props.incViews(props.libro._id)
    }
    return(
        
        <div className='storyContainer'>
                <div className='storyPic' style={{backgroundImage:`url(${props.libro.image})`}}></div>
                <div className='storyBodyContainer'>
                    <p className='storyTitle'>{props.libro.title}</p>
                    <p className='storyUser'>de {props.libro.user.firstname + ' ' + props.libro.user.lastname}</p>
                    <p className='storyGenre'>Genero: {props.libro.genre}</p>
                    <div className='storyIcons'>
                        <p className='storyViews'><i className="far fa-eye"></i> {!props.libro.views ? props.libro.views = 0 : props.libro.views}</p>
                        <p className='storyStars'><i className="far fa-star"></i> {props.libro.stars.length}</p>
                        <p className='storyChapters'><i className="fas fa-list-ul"></i> {props.libro.chapters.length}</p>
                    </div>
                    <p className='storyDescription'>{props.libro.description.substr(0,120)+"..."}</p>
                    <div className='storyButtons'>
                        <Link to={`/story/${props.libro._id}`}><button onClick={views} className='btn btn-danger verMasStory'>Ver Mas</button></Link>
                    </div>
                </div>
        </div>
        
    )
}

const mapDispatchToProps= {
    incViews: bookActions.incViews
}

export default connect(null, mapDispatchToProps)(Story)