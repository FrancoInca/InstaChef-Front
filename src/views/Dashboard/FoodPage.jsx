import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductForm from '../../components/ProductForm';

const initialState = {
  id: '',
  category: '',
  price: 0,
  ingredients: [],
  stock: 0,
  serving_size: [],
  image: '',
};

export default function FoodPage() {
  //States
  const [page, setPage] = useState(0);
  const [foods, setFoods] = useState([]);
  const [results, setResults] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [inputName, setInputName] = useState('');
  const [foodValues, setFoodValues] = useState(initialState);

  //Functions
  const closeWindow = () => {
    setTrigger(false);
    setFoodValues(initialState);
  };

  const getData = async (value = '') => {
    try {
      const promise = !value
        ? axios.get(`/products`)
        : axios.get(`/products/?name=${value}`);
      const response = await promise;
      setResults(response.data);
      setFoods(response.data.slice(page * 10, (page + 1) * 10));
    } catch (error) {
      console.log(error.message);
      setFoods([]);
    }
  };

  //UseEffect
  useEffect(() => {
    getData(inputName);
    //eslint-disable-next-line
  }, [inputName, page, foodValues]);

  return (
    <div className="flex flex-col items-center">
      <div className="bg-backColor-500 p-5 w-full max-w-[720px] rounded-xl">
        <form className="flex w-full justify-center mb-5">
          <input
            type="text"
            className="border border-white rounded-md px-3 py-1 w-[150px]"
            value={inputName}
            onChange={(e) => {
              setPage(0);
              setInputName(e.target.value);
            }}
          />
        </form>
        <div className="grid grid-cols-[6fr_4fr_2fr] text-center mb-5">
          <p>Nombre:</p>
          <p>Stock:</p>
          <p>Editar:</p>
        </div>
        {foods.length ? (
          foods.map((e) => (
            <div key={e.name} className="grid grid-cols-[6fr_4fr_2fr] ">
              <p className="whitespace-nowrap truncate">{e.name}</p>
              <div className="flex justify-center">
                <p className="px-5">{e.stock}</p>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setFoodValues(e);
                    setTrigger(true);
                  }}>
                  +
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center m-10">
            <p>No se encuentran comidas.</p>
          </div>
        )}
        <div className="flex justify-center">
          <button
            onClick={() => {
              page && setPage(page - 1);
            }}>
            -
          </button>
          <p className="px-5">{page + 1}</p>
          <button
            onClick={() => {
              Boolean(page < results.length / 10 - 1) && setPage(page + 1);
            }}>
            +
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="bg-primary-400 p-5 m-3 rounded-lg font-bold"
          onClick={() => {
            setFoodValues(initialState);
            setTrigger(true);
          }}>
          AGREGAR UN PLATILLO
        </button>
      </div>
      {trigger && (
        <ProductForm closeWindow={closeWindow} defaultValues={foodValues} />
      )}
    </div>
  );
}
