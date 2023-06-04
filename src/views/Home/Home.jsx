import Categorias from "./Categorias"
import Paginacion from "./Paginacion"
import Card from "../../components/Card"
import Filters from "./Filters"

import Comidas from "./Comidas.json"
import { useEffect, useState } from "react"

function Home() {
  const [page, setPage] = useState(0)
  const [listFood, setlistFood] = useState(Comidas.slice(page * 9, (page + 1) * 9))
  const [filtered, setFiltered] = useState(Comidas);
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity })

  const [filters, setFilters] = useState([])
  const [sort, setSort] = useState("plus")

  const PrevPage = () => Boolean(page) && setPage(page - 1)
  const NextPage = () => page < filtered.length / 9 - 1 && setPage(page + 1)

  const filterPrice = (value, type) => {
    setPage(0)
    setPriceRange({ ...priceRange, [type]: value })
  }
  const filterSize = (value) => {
    setPage(0);
    if (!filters.includes(value)) return setFilters([...filters, value])
    return setFilters(filters.filter((e) => e !== value))
  }
  const sortPrice = (value) => {
    setSort(value);
    setPage(0);
  }

  useEffect(() => {
    let filteredFood = [...Comidas];
    filters.length ? filteredFood = Comidas.filter((e) => filters.includes(e.serving_size)) :
      filteredFood = [...Comidas]
    filteredFood = filteredFood.filter((e) => e.price >= priceRange.min && e.price <= priceRange.max)
    sort === "plus" ? filteredFood = filteredFood.sort((prev, next) => prev.price - next.price) :
      filteredFood = filteredFood.sort((prev, next) => next.price - prev.price)
    setFiltered(filteredFood)
    setlistFood(filteredFood.slice(page * 9, (page + 1) * 9))
    //eslint-disable-next-line
  }, [page, filters, sort, priceRange])

  return (
    <div className="flex w-[100%] justify-center">
      <div className="grid sm:grid-rows-[fit_auto_auto_fit] sm:grid-cols-[100%] lg:grid-rows-[auto_auto_auto] lg:grid-cols-[100%] w-full max-w-[1280px] justify-center">
        <div className="flex justify-center col-span-full">
          <Categorias />
        </div>
        <div className="h-fit col-span-full mx-8 my-3">
          <Paginacion prev={PrevPage} next={NextPage} page={page + 1} total={Math.floor(filtered.length / 9 + 1)} />
        </div>
        <div className="flex w-[100%] justify-between flex-col lg:flex-row">
          <div className="flex my-8 mx-3 justify-center">
            <Filters filters={filters} sort={sort} filterSize={filterSize} sortPrice={sortPrice} filterPrice={filterPrice} />
          </div>
          <div className="flex flex-wrap justify-center w-[100%]">
            {listFood.length ? listFood.map((e) => (
              <div key={e.id} className="">
                <Card name={e.food_name} price={e.price} />
              </div>
            )) :
              (<div className="h-full flex items-center">
                <h1 className="text-2xl text-center">No se encontró ningun platillo que compla con los requisitos</h1>
              </div>)
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home