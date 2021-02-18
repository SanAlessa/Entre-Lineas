import { Link } from 'react-router-dom'

const CardCategory = (props) => {
  return (
    <>
      <Link to={`/stories/${props.cardCategory.genre}`}>
        <div className='cardCategory'>
          <div className='nameCategory'>
            {props.cardCategory.genre}
          </div>
          <div className='containerLogoCategory'>
            <div className='logoCategory' style={{ backgroundImage: `url(${props.cardCategory.image})`, width: '8vw', height: '8vw' }}>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}

export default CardCategory;