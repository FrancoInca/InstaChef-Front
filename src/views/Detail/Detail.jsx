import { Link, useParams } from "react-router-dom";
import image from "../../assets/amburguesa.png";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { getDetail } from "../../redux/actions";
import PropTypes from 'prop-types';

function Detail({ cart, setCart }) {

  const { id } = useParams();
  const detailProduct = useSelector((state) => state.detail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(id))
  }, [dispatch, id])

  // CART

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    let product = {
      id: detailProduct.id,
      name: detailProduct.name,
      image: detailProduct.image,
      price: detailProduct.price,
      category: detailProduct.category,
      ingredients: detailProduct.ingredients,
      serving_size: detailProduct.serving_size,
      quantity: quantity,
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
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < 12) setQuantity(quantity + 1);
  };

  return (
    <div className="w-full flex justify-center mt-5">
      <div className=" w-11/12 h-[450px] grid grid-cols-2">
        <div className="mr-28 flex flex-col justify-center">

          <div className="m-5" >
            <label className=" font-bold" >Nombre</label>
            <h1 className=" text-gray-400 text-[12px]">{detailProduct.name}</h1>

            <label className=" font-bold">Tipo de comida</label>
            <p className=" text-gray-400 text-[12px]">{detailProduct.category}</p>
          </div>

          <div className="m-5">
            <label className="font-bold" >Ingredientes</label>
            <p className=" w-44 text-gray-400 text-[12px]">{detailProduct.ingredients}</p>
          </div>

          <div className="m-5 flex justify-between">

            <div className="  ">
              <p className="font-bold">Precio</p>
              <span className=" text-red-600 text-[12px]">{detailProduct.price}</span>
            </div>

            <div className="flex text-amber-400 mt-1 mr-20">
              {
                [... new Array(5)].map((start, index) => {
                  return index < 4 ? <AiFillStar key={index} /> : <AiOutlineStar key={index} />
                })
              }
            </div>

          </div>

          <div className=" m-5 flex justify-between">
            <div className="" >
              <label className="font-bold" >Tiempo de Prearacion</label>
              <p className="text-gray-400">26 M</p>
            </div>
            <div>
              <label className=" font-bold">Tamaño de la porcion</label>
              <p className="text-gray-400">{detailProduct.serving_size}</p>
            </div>
          </div>


        </div>


        <div className="max-w-md col-start-2 row-start-1">
          <img src={image} alt="ima" />
        </div>

        <div className="col-start-2 row-start-2 flex items-center ml-20">
          <button onClick={handleDecrement} className="bg-transparent hover:bg-amber-400 text-amber-500 text-lg text-center font-semibold hover:text-stone-950 py-2 px-4 border border-amber-400 hover:border-transparent rounded">
            <span className="flex items-center justify-center h-full">-</span>
          </button>
          <span className="mx-4 text-center">{quantity}</span>
          <button onClick={handleIncrement} className="bg-transparent hover:bg-amber-400 text-amber-500 text-lg text-center font-semibold hover:text-stone-950 py-2 px-4 border border-amber-400 hover:border-transparent rounded">
            <span className="flex items-center justify-center h-full">+</span>
          </button>
        </div>

        <div className="col-start-2 row-start-2 ml-60">
          <Link to='/cart' className="flex">
            <button onClick={handleAddToCart} className="h-12 bg-transparent hover:bg-amber-400 text-amber-500 font-semibold hover:text-stone-950 py-2 px-3.5 border border-amber-400 hover:border-transparent rounded">
              ADD TO CART
            </button>
          </Link>
        </div>


      </div>

    </div>
  )
}

Detail.propTypes = {
  cart: PropTypes.array,
  setCart: PropTypes.func,
};

export default Detail