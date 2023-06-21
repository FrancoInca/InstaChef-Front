import Categorias from './Categorias';
import Paginacion from './Paginacion';
import Card from '../../components/Card';
import Filters from './Filters';
import useLocalStorage from '../../components/useLocalStorage';

import { useEffect, useState } from 'react';
import axios from 'axios';

const CardsPerPage = 9;

function Home() {
  //All states
  const [page, setPage] = useLocalStorage('page-home', 0);
  const [listFood, setListFood] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [inputName, setInputName] = useLocalStorage('nameFilter', '');
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [filters, setFilters] = useLocalStorage('filters', []);
  const [sort, setSort] = useLocalStorage('sort', 'plus');

  //Functions
  const PrevPage = () => Boolean(page) && setPage(page - 1);
  const NextPage = () =>
    page < filtered.length / CardsPerPage - 1 && setPage(page + 1);

  const filterPrice = (value, type) => {
    setPage(0);
    setPriceRange({ ...priceRange, [type]: value });
  };
  const filterSize = (value) => {
    setPage(0);
    if (!filters.includes(value)) return setFilters([...filters, value]);
    return setFilters(filters.filter((e) => e !== value));
  };
  const sortPrice = (value) => {
    setSort(value);
    setPage(0);
  };
  const filterByName = (name) => {
    setInputName(name);
    setPage(0);
  };

  const filterFood = (array) => {
    //Creates a duplicate to avoid modifying the original array.
    let filteredFood = [...array];

    //Filters food by serving size and category
    filters.length &&
      (filteredFood = array.filter(
        (e) =>
          filters.some((filter) => e.serving_size.includes(filter)) ||
          filters.includes(e.category)
      ));
    filteredFood = filteredFood.filter(
      (e) => e.price >= priceRange.min && e.price <= priceRange.max
    );

    //Sorts food by price
    sort === 'plus'
      ? (filteredFood = filteredFood.sort(
          (prev, next) => prev.price - next.price
        ))
      : (filteredFood = filteredFood.sort(
          (prev, next) => next.price - prev.price
        ));

    //Updates all stored food items and the number of food items displayed per page.
    setFiltered(filteredFood);
    setListFood(
      filteredFood.slice(page * CardsPerPage, (page + 1) * CardsPerPage)
    );
    return filteredFood;
  };

  const getAllFood = async () => {
    const comidas = await getProductsFromDB(inputName);
    filterFood(comidas);
  };

  const getProductsFromDB = async (name = '') => {
    try {
      const promise = !name
        ? axios.get('/products/')
        : axios.get(`/products/?name=${name}`);
      const response = await promise;
      return response.data;
    } catch (error) {
      console.log(error.message);
      return [];
    }
  };

  useEffect(() => {
    getAllFood();
    //eslint-disable-next-line
  }, [page, filters, sort, priceRange, inputName]);

  return (
    <div className="flex w-[100%] justify-center">
      <div className="grid grid-rows-[fit_auto_auto_fit] sm:grid-cols-[100%] lg:grid-rows-[auto_auto] lg:grid-cols-[100%] w-full max-w-[1280px] justify-center">
        <div className="flex justify-center col-span-full">
          <Categorias filters={filters} filterHandler={filterSize} />
        </div>
        <div className="h-fit col-span-full mx-8 my-3">
          <Paginacion
            prev={PrevPage}
            next={NextPage}
            page={page + 1}
            total={Math.floor(filtered.length / CardsPerPage + 1)}
          />
        </div>
        <div className="flex w-[100%] justify-between flex-col lg:flex-row">
          <div className="flex my-8 mx-3 justify-center">
            <Filters
              filterByName={filterByName}
              filterPrice={filterPrice}
              filterSize={filterSize}
              nameFilter={inputName}
              sortPrice={sortPrice}
              filters={filters}
              sort={sort}
            />
          </div>
          {listFood.length ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] lg:grid-cols-3 gap-1">
              {listFood.map((e) => (
                <div key={e.id}>
                  <Card
                    id={e.id}
                    name={e.name}
                    image={e.image}
                    price={e.price}
                    type={e.food_type}
                    size={e.serving_size}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full w-[100%] flex items-center justify-center">
              <h1 className="text-2xl text-center">
                No se encontró ningún platillo que cumpla con los filtros
                seleccionados.
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
