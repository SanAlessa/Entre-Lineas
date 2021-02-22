import {connect} from 'react-redux'
import {useState,useEffect}from'react'
import bookActions from "../redux/actions/bookActions"
import Story from './Story'

const Stories = (props)=>{
    const namePage = props.match.params.genre
    const [boolean,setBoolean]=useState(true)
    const [value, setValue] = useState('')
    
    useEffect(()=>{
        props.getByGenre(namePage)
        props.booksByGenre.sort((a,b)=> b.views - a.views)
    },[namePage])

<<<<<<< HEAD
    
    
=======
>>>>>>> 7392598177de9791e1296ee5d670b7d2a94919ad
    if(value !== "") {
        sortFilter()
        setValue('mostPopular')
        setBoolean(!boolean)
        setValue("")
    }
    function sortFilter() {
        if(value ==="mostPopular"){
            props.booksByGenre.sort((a,b)=> b.views - a.views)
        }else if(value === "lessPopular"){
            props.booksByGenre.sort((a,b)=> a.views - b.views)
        }
    }
    return (
        <>
        <div className='storiesContainer'>
            <h1>Historias de <span className='capitalize'>{namePage}</span></h1>
            <div className='boxStories'>
                <div className='upContainerStories'>
                    <p className='storyNumber'>{props.booksByGenre.length} Historias</p>
                    <div className='boxInputStories'>
                        <label htmlFor="popular">Filtrar Por:</label>
                        <select onChange={e => setValue(e.target.value)} name="popular" id="cars">
                            <option value="mostPopular">Mas Populares</option>
                            <option value="lessPopular">Menos Populares</option>
                        </select>
                    </div>
                </div>
                <div className='downContainerStories'>
                    {
                    boolean ? props.booksByGenre.map((libro, i)=>{
                        return(
                            <Story libro={libro} key={`story${i}`}/>
                        )
                    }): props.booksByGenre.map((libro, i)=>{
                        return(
                            <Story libro={libro} key={`story${i}`}/>
                        )
                    })}
                </div>
            </div>
        </div>
        </>
    )
}
const mapStateToProps = state => {
    return {
        books: state.bookR.books,
        booksByGenre: state.bookR.booksByGenre
    }
  }

const mapDispatchToProps = {
    getByGenre: bookActions.getByGenre,

}
export default connect(mapStateToProps,mapDispatchToProps)(Stories);