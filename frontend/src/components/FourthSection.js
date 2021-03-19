import {Link} from 'react-router-dom'

const FourthSection = ()=>{
    return (
        <div className='fourthSection'>
            <div className='upContainerFourth'>
                <div className='fourthSecText'>
                    <p className='fourthTitle'>Lleva Entre Líneas Contigo</p>
                    <p className='fourthBody'>Lee y escribe en cualquier parte, incluso sin conexión.</p>
                </div>
                <div className='fourthSecButtons'>
                <Link to='/search'><button className="btn btn-danger">Comienza a leer</button></Link>
                <Link to='/signin'><button className="btn btn-danger boton2" >Comienza a escribir</button></Link>
                </div>
            </div>
            <div className='fourthSecBack'>
            </div>
        </div>
    )
}
export default FourthSection