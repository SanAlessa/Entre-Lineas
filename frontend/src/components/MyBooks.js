import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
const MyBooks = (props)=>{
    console.log(props.libro)
    return (
        <>
        <div className='storyContainerProfile'>
            <div className='containerFirstBlockStory'>
                <div className='storyPicProfile' style={{backgroundImage:`url(${props.libro.image})`}}></div>
                <div className='containerInformationBookProfile'>
                    <p className='storyTitle'>{props.libro.title}</p>
                    <p className='storyUserProfile'>de <span>{props.libro.user.firstname + ' ' + props.libro.user.lastname}</span></p>
                    <p className='storyGenreProfile'>Genero: <span>{props.libro.genre}</span></p>
                    <div className='storyIconsProfile'>
                        <p className='storyViews'><i className="far fa-eye"></i> {props.libro.views}</p>
                        <p className='storyStars'><i className="far fa-star"></i> {props.libro.stars.length}</p>
                        <p className='storyChapters'><i className="fas fa-list-ul"></i> {props.libro.chapters.length}</p>
                    </div>
                </div>
            </div>
            <div className='containerSecondBlockStory'>
                <p className='storyDescription'>{props.libro.description.substr(0,130)+"..."}</p>
            </div>            
            <div className='containerThirdBlockStory'>
                <div className='storyButtons'>
                    <Link to={`/modify-book/${props.libro._id}`}><button className='btn btn-danger verMasStory'>Editar Libro</button></Link>
                </div>
            </div>
        </div>
        </>
    )
}


const mapStateToProps = state => {
    return {
        books: state.bookR.books,
        loggedUser: state.auth.loggedUser
    }
  }
export default connect(mapStateToProps)(MyBooks);
