import {Link} from 'react-router-dom'

const FirstSection = ()=>{
    return (
        <div className="firstSection">
            <div className="leftBoxFirst">
                <h1 className="titleFirst">Hola, somos Entre Líneas.</h1>
                <p className="firstP">La plataforma del mundo social basada en narrativa más amada en el mundo</p>
                <p className="secondP">Entre Lineas conecta una comunidad global de 90 millones de lectores y escritores a través del poder de las historias.</p>
                <div className="buttonBox">
                <Link to='/search'><button className="btn btn-danger">Comienza a leer</button></Link>
                <Link to='/signin'><button className="btn btn-danger boton2" >Comienza a escribir</button></Link>
                </div>
            </div>
            <div className="rightBoxFirst"></div>
        </div>
    )
}
export default FirstSection