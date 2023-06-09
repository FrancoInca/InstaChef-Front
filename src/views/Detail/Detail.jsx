import { useParams } from 'react-router-dom';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import AddFav from '../../assets/AddFav.svg';
import DelFav from '../../assets/DelFav.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { getDetail, getReview } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { UserAuth } from "../../components/Auth-context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

function Detail({ cart, setCart, favorites, setFavorites }) {
  const navigate = useNavigate()
  const { id } = useParams();
  let token = localStorage.getItem("token");
  const detailProduct = useSelector((state) => state.detail);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({})
  const { user } = UserAuth();

  const getUserDetails = async () => {

    const response = await axios.get(`/users/token/${token}`)
    setUserData(response.data)
    setIsFavorite(response.data.favorite.some((favorite) => favorite === id));
  }

  useEffect(() => {
    dispatch(getDetail(id))
    dispatch(getReview(id))
  }, [dispatch, id])

  // trayendo reviews 
  const reviews = useSelector((state) => state.reviews );
  //FAVORITES

  // const [mounted, setMounted] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  // const [isFavorite, setIsFavorite] = useState(userData?.user?.favorite?.some((fav) => fav === id))

  useEffect(() => {
    if (token) getUserDetails();
    //eslint-disable-next-line
  }, [user])

  const isProductInFavorites = favorites?.some((favorite) => favorite === id);

  const handleAddToFav = async () => {

    if (!user) {
      if (!user) toast.info(`Inicia sesión para ver tus favoritos!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });

      let product = {
        ...detailProduct,
      };

      let newArray = [];
      let isFav = false;
      favorites.forEach((e) => {
        if (e === product.id) {
          newArray.push(product.id);
          isFav = true;
        } else {
          newArray.push(e);
        }
      });
      if (isFav === true) {
        newArray = favorites.filter((e) => e !== id);
        setFavorites(newArray);
      }
      else setFavorites([...favorites, product.id])
    }
    else {
      const userId = userData.id;
      const productId = detailProduct.id;
      const response = await axios.put(`/users/${userId}/favorites`, { productId: [productId] });
      setIsFavorite(response?.data?.favorite.some((favorite) => favorite === id))
    }
    <ToastContainer />
  }

  // CART

  const [quantity, setQuantity] = useState(detailProduct.stock == 0 ? 0 : 1);

  const handleAddToCart = () => {
    if (quantity != 0) {
      let product = {
        ...detailProduct,
        quantity,
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
      navigate('/cart');
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < detailProduct.stock) setQuantity(quantity + 1);
  };

  return (
    <div className="flex justify-center w-full">
      <div className=" justify-center w-full max-w-[1280px] bg-backColor-500 m-5 p-5 rounded-[20px] grid lg:grid-cols-2">
        <div className="mr-28 flex flex-col justify-center row-start-2 lg:row-start-1">
          <div className="m-5 grid grid-cols-3">
            <label className="font-bold text-[27px] col-span-2">
              {detailProduct.name}
            </label>
            <div className='-mt-1'>
              <button onClick={handleAddToFav}>{isProductInFavorites || isFavorite ? <img src={DelFav} className='h-9' /> : <img src={AddFav} className='h-9' />}</button>
            </div>
          </div>

          <div className="mt-5 ml-5">
            <label className="font-bold text-[21px]">Tipo de comida</label>
            <p className="mt-5 text-gray-400">{detailProduct.category}</p>
          </div>
          <div className="m-5 ">
            <label className="font-bold text-[21px]">Ingredientes</label>
            <ul className="mt-5">
              {Boolean(detailProduct.ingredients) && detailProduct.ingredients.map((e) => (<li key={e} className="text-gray-400"> - {e}</li>))}
            </ul>
          </div>
         
          <div className=" m-5 mt-0 flex justify-between">
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
          <div className="m-5 flex">
           
<article className="">
  <h1 className=" text-[16px] font-bold my-5">reviews</h1>
  {
    reviews && reviews.length ? reviews.map(r => (
      <div key={r.id} className=" w-full flex gap-1">
         <div>
         <img
              alt="Man"
              src={r.foto ? r.foto: "https://i.pinimg.com/564x/c0/c8/17/c0c8178e509b2c6ec222408e527ba861.jpg"}
              className="h-5 w-5 rounded-full object-cover"
            />
      </div>
    <div>
      <aside className="">
       <p className="text-[13px] ">
       {r.nameUser}
       </p>
      </aside>
    <div className=" w- full flex  justify-around ">
    <aside className=" text-[12px] leading-normal text-gray-300">
    <p>{r.body}</p>
    </aside>
    <aside>
    <div className="my-5 mt-0 flex justify-between">
            <div className="flex text-[14px] text-amber-400 ml-5 mt-1 mr-20">
              {
                [... new Array(5)].map((start, index) => {
                  return index < r.rating ? <AiFillStar key={index} /> : <AiOutlineStar key={index} />
                })
              }
            </div>
          </div>
    </aside>
    </div>
    </div>
   
   </div>
    ))   : <p className=" text-[13px] text-gray-400">Este plato no tiene comentarios aun</p> }
    
</article>

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
  favorites: PropTypes.array,
  setFavorites: PropTypes.func,
  favoriteChanged: PropTypes.bool,
  setFavoriteChanged: PropTypes.func,
};

export default Detail;
