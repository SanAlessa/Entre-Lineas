import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import authActions from '../redux/actions/authActions'
import bookActions from '../redux/actions/bookActions'
import cardActions from '../redux/actions/cardActions'
import {useState, useEffect } from 'react'

const Header = (props) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    props.getBooks()
    props.getCardsCategories()
  }, [])

  return (
    <header>
      <div className="headerLeft">
      <Link to="/"><div className="prueba"></div></Link>{/* <Link to="/"><img src={'../assets/Logo-EntreLineas-Pluma-inclinada.png'} style={{marginLeft: '-8vw'}} className="logo" alt='logo Entre Líneas'></img></Link> */}
        <div className="dropdown">
          <p>Navegar</p>
          <div className="dropdown-content">
            <div className="genres">
              {props.genres.map((genre, i) => <Link to={`/stories/${genre.genre}`} key={"linkGenre"+i}><p className="genre">{genre.genre}</p></Link>)}
            </div>
          </div>
        </div>
      </div>
      <Link to="/search"><div className="toSearch">
        <i className="fas fa-search"></i>
        <p>Buscar</p>
      </div></Link>
      {props.loggedUser && !props.loggedUser.image ?
        <div className="headerRight">
          <p>Hola! {(props.loggedUser.firstname).toUpperCase()}</p>
          <div className='containerDrop' onClick={() => setVisible(!visible)}>
            {visible &&
              <div className='dropDownMenu'>
                <ul>
                  <Link to='/userprofile'><li>Mi Perfil</li></Link>
                  <Link to='/add-book'><li>Crear un Nuevo Libro</li></Link>
                  <Link to='/settings'><li>Configuración</li></Link>
                  <Link to='/' onClick={props.logout}><li>Cerrar mi Sesión</li></Link>
                </ul>
              </div>
            }
            <div className="dropDownPic">{props.loggedUser.firstname.toUpperCase().substr(0, 1)}
            </div>
            <i style={{color: 'black'}} className="fas fa-caret-down" ></i>
          </div>
        </div>
        : props.loggedUser && props.loggedUser.image
        ?<>
        <div className="headerRight" >
          <p>Hola! {(props.loggedUser.firstname).toUpperCase()}</p>
          <div className='containerDrop' onClick={() => setVisible(!visible)}>
            {visible &&
              <div className='dropDownMenu'>
                <ul>
                  <Link to='/userprofile'><li>Mi Perfil</li></Link>
                  <Link to='/add-book'><li>Crear un Nuevo Libro</li></Link>
                  <Link to='/settings'><li>Configuración</li></Link>
                  <Link to='/' onClick={props.logout}><li>Cerrar mi Sesión</li></Link>
                </ul>
              </div>
            }
            <div className="dropDownPic" style={{backgroundImage: `url('${props.loggedUser.image}')`}}></div>
            <i style={{color: 'black'}} className="fas fa-caret-down" ></i>
          </div>
        </div>
        </>
        :
        <div className="headerRight">
        <Link to="/signin"><p>Iniciar sesión</p></Link>
        <Link to="/register"><p>Regístrate</p></Link>
        </div>
      }
    </header>
  )
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.auth.loggedUser,
    genres: state.cardR.genres,
    cardsCategories: state.cardR.cardsCategories,
    books: state.bookR.books
  }
}

const mapDispatchToProps = {
  logout: authActions.logOutUser,
  getBooks: bookActions.getBooks,
  getCardsCategories: cardActions.getCardsCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)


/**/