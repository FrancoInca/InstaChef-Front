import { func, arrayOf, string } from "prop-types";

let arrayCate = [
  {
    name: "Hamburgesa",
    imagen: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
  },
  {
    name: "Pizza",
    imagen: "https://cdn-icons-png.flaticon.com/512/3595/3595458.png"
  },
  {
    name: "Fritura",
    imagen: "https://cdn-icons-png.flaticon.com/512/2836/2836558.png"
  },
  {
    name: "Empanada",
    imagen: "https://cdn-icons-png.flaticon.com/512/5100/5100421.png"
  }
];

function Categorias({ filterHandler, filters }) {
  const styleDiv = {
    "background-color": "#DC2626",
    "color": "white"
  }
  return (
    <section className='flex justify-center rounded-md bg-white my-5 w-[80%]'>
      {
        arrayCate.map((c, i) => (
          <div key={i} onClick={() => filterHandler(c.name)} className="flex flex-col items-center justify-center  m-1 rounded-lg p-2 hover:bg-primary-400 text-black hover:text-white hover:cursor-pointer border border-primary-400 w-[70px]" style={filters.includes(c.name) ? styleDiv : {}}>
            <img src={c.imagen} alt={c.name} className="w-7" />
            <p className="text-[12px]">
              {c.name}
            </p>
          </div>
        ))
      }
    </section >
  )
}
Categorias.propTypes = {
  filterHandler: func,
  filters: arrayOf(string)
}
export default Categorias