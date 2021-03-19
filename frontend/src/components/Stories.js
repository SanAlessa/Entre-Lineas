import {connect} from 'react-redux'
import {useState,useEffect}from'react'
import bookActions from "../redux/actions/bookActions"
import Story from './Story'
import {Spinner} from 'reactstrap'
const Stories = (props)=>{
    const namePage = props.match.params.genre
    const [boolean,setBoolean]=useState(true)
    const [loaded, setLoaded]=useState(false)
    const [value, setValue] = useState('')
    
    useEffect(async()=>{
        await props.getByGenre(namePage)
        setLoaded(true)
        props.booksByGenre.sort((a,b)=> b.views - a.views)
    },[namePage])


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
        {!loaded ? 
        <div className="cajaSpinner">
        <div className="cajitaSpinner">
          <Spinner  className="spinner"/>
        </div>
      </div>
        :
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
                {props.booksByGenre.length === 0 ? 
                <div className='ops' style={{height:"50vh"}}>
                    <h1>Aún no hay historias en esta sección, se el primero!</h1>
                </div>:
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
    </div>}
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
