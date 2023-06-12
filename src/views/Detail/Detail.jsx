import { useParams } from "react-router-dom";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { getDetail } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

function Detail({ cart, setCart }) {
  const navigate = useNavigate()
  const { id } = useParams();
  const detailProduct = useSelector((state) => state.detail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(id))
  }, [dispatch, id])

  // CART

  const [quantity, setQuantity] = useState(detailProduct.stock == 0 ? 0 : 1);

  const handleAddToCart = () => {
    if (quantity != 0) {
      let product = {
        ...detailProduct,
        quantity
      };

      const newArray = [];
      let duplicated = false;
      cart.forEach((e) => {
        if (e.id === product.id) {
          newArray.push(product);
          duplicated = true;
        } else {
          newArray.push(e);
        }
      });
      if (duplicated === true) newArray;
      else setCart([...cart, product]);
      navigate("/cart")
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity != 0) setQuantity(quantity + 1);
  };

  return (
    <div className="flex justify-center w-full">
      <div className=" justify-center w-full max-w-[1280px] bg-backColor-500 m-5 p-5 rounded-[20px] grid lg:grid-cols-2">
        <div className="mr-28 flex flex-col justify-center row-start-2 lg:row-start-1">
          <div className="m-5" >
            <label className="font-bold text-[27px]" >{detailProduct.name}</label>
          </div>
          <div className="mt-5 ml-5">
            <label className="font-bold text-[21px]">Tipo de comida</label>
            <p className="mt-5 text-gray-400">{detailProduct.category}</p>
          </div>
          <div className="m-5">
            <label className="font-bold text-[21px]">Ingredientes</label>
            <ul className="mt-5">
              {Boolean(detailProduct.ingredients) && detailProduct.ingredients.map((e) => (<li key={e} className="text-gray-400"> - {e}</li>))}
            </ul>
          </div>
          <div className="m-5 flex justify-between">
            <div className="flex text-amber-400 mt-1 mr-20">
              {
                [... new Array(5)].map((start, index) => {
                  return index < 4 ? <AiFillStar key={index} /> : <AiOutlineStar key={index} />
                })
              }
            </div>
          </div>
          <div className=" m-5 flex justify-between">
            <div>
              <label className="font-bold">Stock:</label>
              <p>{detailProduct.stock}</p>
            </div>
          </div>
          <div className=" m-5 flex justify-between">
            <div>
              <label className="font-bold">Tamaño de la porción</label>
              {Boolean(detailProduct.serving_size) && (detailProduct.serving_size.map((e) => (<p className="text-gray-400" key={e}> - {e}</p>)))}
            </div>
          </div>
        </div>
        <div className="flex flex-col p-5 justify-center">
          <div className="">
            <img src={detailProduct.image} alt={detailProduct.name} className="rounded-[20px]" />
          </div>
          <h1 className="p-5 text-[24px] font-bold text-center">Precio: ${detailProduct.price}</h1>
          <div className="grid grid-rows-2 justify-center sm:grid-cols-2 sm:grid-rows-1 ">
            <div className="flex items-center justify-center">
              <button onClick={handleDecrement} className="bg-transparent hover:bg-amber-400 text-amber-500 text-lg text-center font-semibold hover:text-stone-950 py-2 px-4 border border-amber-400 hover:border-transparent rounded">
                <span className="flex items-center justify-center h-full">-</span>
              </button>
              <span className="mx-4 text-center w-[20px]">{quantity}</span>
              <button onClick={handleIncrement} className="bg-transparent hover:bg-amber-400 text-amber-500 text-lg text-center font-semibold hover:text-stone-950 py-2 px-4 border border-amber-400 hover:border-transparent rounded">
                <span className="flex items-center justify-center h-full">+</span>
              </button>
            </div>
            <div className="w-full flex justify-center my-3">
              <button onClick={handleAddToCart} className="h-12 bg-transparent hover:bg-amber-400 text-amber-500 font-semibold hover:text-stone-950 py-2 px-3.5 border border-amber-400 hover:border-transparent rounded">
                Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>)

}

Detail.propTypes = {
  cart: PropTypes.array,
  setCart: PropTypes.func,
};

export default Detail