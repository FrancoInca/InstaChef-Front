import PropTypes from "prop-types"

export default function Paginacion({ prev, next, page, total }) {
  return (
    <div className="flex justify-center ">
      <button onClick={prev}>
        {"<"}
      </button>
      <p className="mx-3 w-[60px] text-center">{page} / {total}</p>
      <button onClick={next}>
        {">"}
      </button>
    </div>
  )
}
Paginacion.propTypes = {
  prev: PropTypes.func,
  next: PropTypes.func,
  page: PropTypes.number,
  total: PropTypes.number
}