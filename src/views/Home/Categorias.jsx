import { func, arrayOf, string } from "prop-types";

let arrayCate = [
  {
    name: "Hamburguesas",
    imagen: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
  },
  {
    name: "Pizzas",
    imagen: "https://cdn-icons-png.flaticon.com/512/3595/3595458.png"
  },
  {
    name: "Frituras",
    imagen: "https://cdn-icons-png.flaticon.com/512/2836/2836558.png"
  },
  {
    name: "Ensalada",
    imagen: "https://cdn-icons-png.flaticon.com/512/1625/1625042.png"
  },
  {
    name: "Desayuno",
    imagen: "https://cdn-icons-png.flaticon.com/512/4825/4825292.png"
  },
  {
    name:"Postre",
    imagen: "https://cdn-icons-png.flaticon.com/512/2488/2488456.png"
  }
];

function Categorias({ filterHandler, filters }) {
  const styleDiv = {
    "backgroundColor": "#fbbf24",
    "color": "white"
  }
  return (
    <section className='flex justify-center rounded-md bg-white my-5 w-[80%]'>
      {
        arrayCate.map((c, i) => (
          <div key={i} onClick={() => filterHandler(c.name)} className="flex flex-col items-center justify-center  m-1 rounded-lg p-2 hover:bg-primary-400 text-black hover:text-white hover:cursor-pointer border border-primary-400 w-[90px]" style={filters.includes(c.name) ? styleDiv : {}}>
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