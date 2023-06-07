import Categorias from "./Categorias"
import Paginacion from "./Paginacion"
import Card from "../../components/Card"
import Filters from "./Filters"

import { useEffect, useState } from "react"
import axios from "axios"

function Home() {
  const [page, setPage] = useState(0)
  const [allFood, setAllFood] = useState([])
  const [listFood, setlistFood] = useState([])
  const [filtered, setFiltered] = useState([]);
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
  const getProductsFromDB = async() => {
    const response = await axios.get("/products/");
    return response.data
  }
  const filterFood = (array) => {
    let filteredFood = [...array];
    filters.length ? filteredFood = array.filter((e) => filters.some((filter)=> e.serving_size.includes(filter) ) || filters.includes(e.category)) :
      filteredFood = [...array]
    filteredFood = filteredFood.filter((e) => e.price >= priceRange.min && e.price <= priceRange.max)
    sort === "plus" ? filteredFood = filteredFood.sort((prev, next) => prev.price - next.price) :
      filteredFood = filteredFood.sort((prev, next) => next.price - prev.price)
    setFiltered(filteredFood)
    setlistFood(filteredFood.slice(page * 9, (page + 1) * 9))
    return filteredFood
  }

  useEffect(() => {
    const getAllFood = async () => {
      const comidas = await getProductsFromDB()
      setAllFood(comidas)
      filterFood(comidas)
    }
    !allFood.length ? getAllFood() : filterFood(allFood)
    //eslint-disable-next-line
  }, [page, filters, sort, priceRange])

  return (
    <div className="flex w-[100%] justify-center">
      <div className="grid sm:grid-rows-[fit_auto_auto_fit] sm:grid-cols-[100%] lg:grid-rows-[auto_auto_auto] lg:grid-cols-[100%] w-full max-w-[1280px] justify-center">
        <div className="flex justify-center col-span-full">
          <Categorias filters={filters} filterHandler={filterSize} />
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
                <Card name={e.name} price={e.price} type={e.food_type} size={e.serving_size} id={e.id}/>
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