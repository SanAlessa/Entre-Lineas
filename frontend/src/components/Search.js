import CardCategory from "./CardCategory"
import {connect} from "react-redux"
import {useEffect, useState} from "react"
import bookActions from "../redux/actions/bookActions"
import cardActions from '../redux/actions/cardActions'
import Story from './Story'

const Search = (props) => {
    const [value, setValue] = useState(false)
        
    useEffect( () => {
        props.getBooks()
    },[])

    const searching = (e) => {
        props.search(e.target.value)
        setValue(true)
        e.target.value === "" && setValue(false)
    }

    return(
        <div className='containerComponentSearchStories'>
            <div className='containerSearchBar'>
                <input type='text' className='inputSearchStories' placeholder='¿Qué vas a leer hoy?' onChange={searching}></input>
                <div className='iconSearchStories'><i className="fas fa-search"></i></div>
            </div>
            {value === false ? 
            <>
            <div className='containerTitleSearch'>
                <h1>Explorá las categorías<span>&#160;</span></h1>
            </div>
            <div className='containerViewCardsCategories'>
                {props.genres.map((cardCategory, index) => {
                    return <CardCategory cardCategory={cardCategory} key={index}/>
                })}
            </div>
            </> 
            : 
            <>
            <h2>Su busqueda</h2>
            <div className="resultBusqueda">
            {props.filter.map((book, index) =>
            
                <Story libro={book} key={index}/>
            )}
            </div>
            </>}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loggedUser: state.auth.loggedUser,
        books: state.bookR.books,
        filter: state.bookR.filter,
        genres: state.cardR.genres,
    }
}   

const mapDispatchToProps = {
    getBooks: bookActions.getBooks,
    search: bookActions.searchBooks
}

export default connect(mapStateToProps,mapDispatchToProps)(Search);