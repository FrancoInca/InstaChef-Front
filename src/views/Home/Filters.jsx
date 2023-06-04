import PropType from "prop-types"

const Filters = ({ filterSize, filterPrice, sortPrice, filters, sort }) => {
  const ServingSize = ["Individual", "Bipersonal", "Familiar"]

  return (
    <div className="flex bg-white p-6 text-black w-[80%] lg:w-[200px] h-fit rounded-lg">
      <form className="w-full text-center">
        <h1>Filtrar:</h1>
        <div className="grid sm:grid-cols-2 sm:grid-rows-1 lg:grid-rows-2 lg:grid-cols-1 items-center">
          <div className="flex flex-col items-center">
            <p>Cantidad de personas:</p>
            <div className="lg:w-full m-2">
              {ServingSize.map((e) => (
                <div key={e} className="flex items-center">
                  <input type="checkbox" id={e} className="mx-3" checked={filters.includes(e)} onChange={() => filterSize(e)} />
                  <label htmlFor={e}>{e}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h1>Precio del plato:</h1>
            <div className="lg:w-full my-2">
              <div className="flex items-center">
                <input type="radio" id="plus" name="sortPrice" className="mx-3" onChange={() => sortPrice("plus")} checked={sort === "plus"} />
                <label htmlFor="plus">{"$ -> $$$"}</label>
              </div>
              <div className="flex items-center">
                <input type="radio" id="minus" name="sortPrice" className="mx-3" onChange={() => sortPrice("minus")} checked={sort === "minus"} />
                <label htmlFor="minus">{"$$$ -> $"}</label>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-center my-2 items-center">
                <input type="number" className="border border-black w-[80px] mx-1 text-center p-2" placeholder="Mínimo" onChange={(e) => { filterPrice(e.target.value, "min") }} />
                <p> - </p>
                <input type="number" className="border border-black w-[80px] mx-1 text-center p-2" placeholder="Máximo" onChange={(e) => { (e.target.value) ? filterPrice(e.target.value, "max") : filterPrice(Infinity, "max") }} />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>)
}

Filters.propTypes = {
  filterSize: PropType.func,
  filterPrice: PropType.func,
  sortPrice: PropType.func,
  filters: PropType.arrayOf(PropType.string),
  sort: PropType.string
}
export default Filters