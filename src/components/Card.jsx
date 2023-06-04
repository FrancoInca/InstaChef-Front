import PropTypes from "prop-types"

function Card({ name, price }) {
  return (
    <div className="flex flex-col max-h-[120px] aspect-video m-4">
      <div>
        <img src="https://i.imgur.com/zJucG8M.png" alt={name} className="w-[100%] aspect-video" />
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
  price: PropTypes.number
}

export default Card