import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { UserAuth } from "../../components/Auth-context/AuthContext";
import LogIn from "../../components/authentication/Log-In";
import { useState } from "react";
import SignUp from "../../components/authentication/SignUp";

function Cart({ cart, setCart }) {
  // const user = JSON.parse(localStorage.getItem('user'));
  const totalPrice = cart.reduce((acc, el) => acc + el.quantity * el.price, 0);
  const navigate = useNavigate();
  const { user } = UserAuth();
  const [triggerPopUpSignUp, setTriggerPopUpSignUp] = useState(false);
  const [triggerPopUp, setTriggerPopUp] = useState(false);

  const cartQuantity = cart.reduce((acc, el) => {
    return acc + el.quantity;
  }, 0);

  const handleIncrement = (id) => {
    const newCart = cart.map((item) => item.id === id
      ? { ...item, quantity: item.quantity === item.stock ? item.quantity : item.quantity + 1 }
      : item
    )
    setCart(newCart)
  };

  const handleDecrement = (id) => {
    const newCart = cart.map((item) => item.quantity > 0 && item.id === id
      ? Boolean(item.quantity - 1) && { ...item, quantity: item.quantity - 1 }
      : item
    ).filter((e) => e !== false)
    setCart(newCart)
  };

  const handleRemove = (id) => {
    const newCart = cart.filter((e) => e.id !== id)
    setCart(newCart);
  };

  const buyFunction = async () => {
    try {
      navigate("/checkout")
      // const response = await axios.post('/Checkout', cart);
      // setCart([])
      // window.location.href = response.data.response.body.init_point;
    } catch (error) { console.log(error) }
  }

  return cart.length < 1 ? (
    <div className="flex flex-col items-center mt-4">
      <h2 className="text-center">Tu carrito está vacío</h2>
      <p>¿No sabes qué comprar? ¡Miles de productos te esperan!</p>
      <button
        onClick={() => navigate("/home")}
        className="flex items-center justify-center m-4 p-4 w-72 rounded-md bg-primary-500 text-bg-stone-100 font-bold text-base cursor-pointer transition duration-200 hover:bg-primary-400"
      >
        Descubrir ofertas
      </button>
    </div>
  ) : (
    // <div className="grid grid-rows-[1fr_auto] md:grid-cols-[auto_30%]">
    <div className="flex flex-col md:flex-row justify-center items-start">
      <div className="w-full max-w-[920px] ">
        {cart?.map((product) => {
          return (
            <div className="m-2 mt-3 bg-red-800 rounded-md items-center p-1 md:max-h-[120px]" key={product.id}>
              <div className="m-0.5 bg-red-800 rounded-sm grid grid-rows-2 grid-cols-[1fr_3fr_1fr] md:grid-cols-4 md:grid-rows-1 items-center p-4 md:max-h-[110px] border-white border text-center">
                <img src={product.image} alt={product.name} className="w-full max-h-[110px] aspect-video sm:py-2 sm:px-5" ></img>

                <div className="text-xl font-normal text-#202020 font-playfair ">{product.name}</div>

                <div className="text-lg font-normal text-#202020">$ {product.price}</div>


                <div className="w-full flex justify-around font-heading items-center col-span-3 md:col-span-1 md:flex-col md:gap-2 lg:flex-row">
                  <div className="flex items-center">
                    <button
                      className="flex justify-center items-center bg-transparent font-bold hover:bg-[#fefefe] text-[#fefefe] text-2xl text-center hover:text-stone-950 py-1 px-4 border border-white hover:border-transparent rounded-sm"
                      onClick={() => handleDecrement(product.id)}
                    >
                      <span className="flex items-center justify-center h-full pb-1">-</span>
                    </button>
                    <div className="mx-4 text-center">{product.quantity}</div>
                    <button
                      className="flex justify-center items-center bg-transparent font-bold hover:bg-[#fefefe] text-[#fefefe] text-2xl text-center hover:text-stone-950 py-1 px-4 border border-white hover:border-transparent rounded-sm"
                      onClick={() => handleIncrement(product.id)}
                    >
                      <span className="flex items-center justify-center h-full pb-1">+</span>
                    </button>
                  </div>
                  <button
                    className="h-12 md:w-full lg:w-fit bg-transparent hover:bg-[#fefefe] text-[#fefefe] font-playfair font-black hover:text-red-800 py-2 px-3.5 border border-white hover:border-transparent rounded-sm"
                    onClick={() => handleRemove(product.id)}
                  >
                    Quitar
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full md:w-fit flex justify-center">
        <div className=" w-full md:w-fit bg-red-800 rounded-md flex justify-center items-center m-3 shadow-md p-2 max-h-[360px]">
          <div className=" bg-red-800 rounded-sm flex flex-col justify-center items-center border-white border py-6 px-6 w-full md:w-fit h-full">

            <h2 className="text-4xl mt-2 font-playfair italic">{user ? user.displayName ? "Tu carrito" : "Tu carrito" : "Tu carrito"}</h2>

            <p className="text-center m-1 font-playfair text-lg"> Artículos: {cartQuantity}</p>
            <p className="text-center m-1 font-playfair text-lg">
              Envío: <span>gratis!</span>
            </p>


            <div className="text-center m-2 mb-3 font-bold font-playfair text-3xl">
              <span>PRECIO TOTAL <span className="text-2xl mr-1">$</span>{totalPrice}</span>
            </div>

            <div className="">
              <div>
                <SignUp trigger={triggerPopUpSignUp} setTrigger={setTriggerPopUpSignUp} setLoginTrigger={setTriggerPopUp} />
              </div>
              <div>
                <LogIn trigger={triggerPopUp} setTrigger={setTriggerPopUp} setTriggerSignUp={setTriggerPopUpSignUp} />
              </div>
              <button
                className=" h-12 bg-transparent text-[#fefefe] font-playfair font-black tracking-wider py-2 px-3.5 border border-white rounded-sm hover:bg-[#fefefe] hover:text-red-800 hover:font-black"
                onClick={user ? () => buyFunction() : () => setTriggerPopUp(true)}
              >
                {user ? "COMPRAR" : "Inicia sesión!"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
Cart.propTypes = { cart: PropTypes.array, setCart: PropTypes.func };
export default Cart;
