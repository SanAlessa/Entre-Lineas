import { Link } from 'react-router-dom'
import Settings from './Settings'
import { connect } from 'react-redux'
import {useState} from 'react'
import MyBooks from './MyBooks'
import authActions from '../redux/actions/authActions'

const UserProfile = (props) => {
    var myBooks = props.books.filter(book => book.user._id === props.loggedUser.id)
    var booksLiked = props.books.filter(book => book.stars.includes(props.loggedUser.id))
    const [visible, setVisible]=useState(true)

    return(
        <>
            <div className='containerComponentUserProfile'>
                <div className='containerBannerUserData'>
                    <div className='bannerUserData'>
                        <div className='photoEditProfile'>
                            {props.loggedUser.image
                            ?
                            <div className='photoUser'style={{ backgroundImage: `url(${props.loggedUser.image})`}}>
                            </div>:
                            <div className="letterUser">{props.loggedUser.firstname.toUpperCase().substr(0, 1)}
                            </div>
                            }
                            <div className='buttonEditProfile'>
                                <Link to='/settings'><button><i className="fas fa-cog"></i> Editar mis Datos</button></Link>
                            </div>
                        </div>
                        <div className='informationProfileUserBlock'>
                            <div className='containerInformationFixed'>
                            <div className='informationProfileUserFixed'>
                                <div className='iconInformationProfileUserFixed'><i className="fas fa-user"></i></div>
                                <div className='dataInformationProfileUserFixed'><p>{props.loggedUser.firstname} {props.loggedUser.lastname}</p></div>
                            </div>
                            <div className='informationProfileUserFixed'>
                                {props.loggedUser.birthday
                                ?
                                <>
                                    <div className='iconInformationProfileUserFixed'><i className="fas fa-birthday-cake"></i></div>
                                    <div className='dataInformationProfileUserFixed'>
                                        <p>{props.loggedUser.birthday.substr(0, 10)}</p>   
                                    </div>
                                </>
                                :
                                <>
                                    <div className='iconInformationProfileUserFixed'><i className="fas fa-envelope"></i></div>
                                    <div className='dataInformationProfileUserFixed'>
                                        <p>{props.loggedUser.email.substr(0, 10)}</p>   
                                    </div>
                                </>

                                }
                            </div>
                            <div className='informationProfileUserFixed'>
                                <div className='iconInformationProfileUserFixed'><i className="fas fa-bookmark"></i></div>
                                <div className='dataInformationProfileUserFixed'><p>Libros Guardados</p></div>
                            </div>
                            </div>
                            <div className='buttonLogout'>
                            <Link to='/' onClick={props.logOut}><button>Cerrar mi sesión</button></Link>
                            </div>

                        </div>
                    </div>
                </div>
                <div className='containerContentOptions'>
                    <h2 className='titleProfile'>Mi Perfil</h2>
                    <div className='containerNavMenu'>
                        <Link ><div onClick={()=>setVisible(true)} className='optionMenu'>Mis Libros</div></Link>
                        <Link ><div onClick={()=>setVisible(false)} className='optionMenu savedBooks'>Mi Biblioteca</div></Link>
                    </div>
                    <div className='containerViewComponentOption'>
                    <div className='booksBoxUserProf'>
                            {visible ? myBooks.length === 0 ? <h1 style={{textAlign:'center'}}>Todavía no tienes libros creados. Comienza a escribir tus historias</h1> : myBooks.map(book => <MyBooks libro={book}/>): 
                            booksLiked.length === 0 ? <h1 style={{textAlign:'center'}}>Todavia no te gusto ningun libro!</h1>: booksLiked.map(book=> <MyBooks libro={book}/>)}    
                     </div>   
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

const mapDispatchToProps = {
    logOut: authActions.logOutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
