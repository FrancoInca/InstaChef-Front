import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"

function Card({ name, price, id, image }) {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col w-full max-h-[270px] aspect-video px-[10px] hover:cursor-pointer" onClick={() => { navigate(`/detail/${id}`) }}>
      <div>
        <img src={image} alt={name} className="max-w-full aspect-video rounded-[10px]" />
      </div>
      <div className="grid grid-cols-2">
          <p className="break-words text-left">{name}</p>
          <p className="text-right">${price}</p>
      </div>
    </div>
  )
}
Card.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.arrayOf(PropTypes.string),
  price: PropTypes.number,
  id: PropTypes.string,
  image: PropTypes.string
}

export default Card