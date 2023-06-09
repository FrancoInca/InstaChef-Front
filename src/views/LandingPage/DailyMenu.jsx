import PropTypes from "prop-types"

function DailyMenu({ background, name, description }) {
  return (
    <div className="flex">
      <div className={`relative w-[100%] bg-slate-500 aspect-video align-middle rounded-xl flex flex-col justify-end text-left`}>
        <div className="bg-slate-600/75 p-4 rounded-b-xl z-10">
          <p className="pb-2 font-bold">{name}</p>
          <p>{description}</p>
        </div>
        <img src={background} alt={name} className="absolute w-[100%] h-[100%] z-0 rounded-xl" />
      </div>
    </div>
  )
}
DailyMenu.propTypes = {
  background: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string
}
export default DailyMenu