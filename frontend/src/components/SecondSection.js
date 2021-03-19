const SecondSection = ()=>{
    return (
        <>
        <div className="secondSection">
            <div className="upBoxSecond">
                <div className="firstUp">
                    <p>Ver tu historia...</p>
                </div>
                <div className="secondUp">
                    <div className='verContainer'>
                        <i className="fas fa-tv"></i>
                        <p>Consigue que tu historia se produzca como una película</p>
                    </div>
                    <div className='verContainer'>
                        <i className="fas fa-film"></i>
                        <p className="block">Consigue que tu historia se adapte como Serie de Televisión</p>
                    </div>
                    <div className='verContainer'>
                        <i className="fas fa-book"></i>
                        <p>Conviértete en un autor publicado</p>
                    </div>
                </div>
            </div>
            <div className='downBoxSecond'>
                <div className="imgBoxSecond"></div>
                <div className='textRightSecondBox'>
                    <p className='firstTextRightSecond'>Tu historia original puede ser un nuevo y grandioso éxito</p>
                    <p className='secondTextRightSecond'>Entre Lineas Studios descubre nuevos talentos entre los escritores y los conecta a compañías globales de multimedia, tales como:</p>
                    <div className='svgContainer'>
                        <div className='sony'></div>
                        <div className='hulu'></div>
                        <div className='syfy'></div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default SecondSection