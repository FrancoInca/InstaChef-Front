import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function Cart({ cart, setCart }) {
    // const user = JSON.parse(localStorage.getItem('user'));
    // const totalPrice = cart.reduce((acc, el) => acc + el.quantity * el.price, 0);
    const navigate = useNavigate();

    // const cartQuantity = cart.reduce((acc, el) => {
    //     return acc + el.quantity;
    // }, 0);

    const handleIncrement = (id) => {
        setCart((product) => {
            return product.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        quantity:
                            item.quantity === item.stock ? item.quantity : item.quantity + 1,
                    };
                } else {
                    return item;
                }
            });
        });
    };

    const handleDecrement = (id) => {
        setCart((currItem) => {
            if (currItem.find((item) => item.id === id)?.quantity === 1) {
                return currItem.filter((item) => item.id !== id);
            } else {
                return currItem.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
    };

    const handleRemove = (id) => {
        setCart((currItem) => {
            return currItem.filter((item) => item.id !== id);
        });
    };

    const buyFunction = async () => {
        try {
            const response = await axios.post('/payment', cart);
            await setCart([])
            window.location.href = response.data.response.body.init_point;
        } catch (error) { console.log(error) }
    }

    return cart.length < 1 ? (
        <div className="flex flex-col items-center mt-4">
            <h2 className="text-center">Tu carrito está vacio</h2>
            <p>¿No sabés qué comprar? ¡Miles de productos te esperan!</p>
            <button
                onClick={() => navigate("/home")}
                className="flex items-center justify-center m-4 p-4 w-72 rounded-md bg-primary-500 text-bg-stone-100 font-bold text-base cursor-pointer transition duration-200 hover:bg-primary-400"
            >
                Descubrir ofertas
            </button>
        </div>
    ) : (
        <div className="{cartContainer}">
            <div className="{cartProducts}">
                {cart?.map((product) => {
                    return (
                        <div className="{cartContent}" key={product.id}>
                            <img src={product.image}></img>

                            <div className="{productName}">{product.name}</div>

                            <div className="{productStock}">Stock: {product.stock}</div>

                            <div className="{productPrice}">${product.price}</div>

                            <div className="{cartCounter}">
                                <button
                                    className="{cartButton}"
                                    onClick={() => handleDecrement(product.id)}
                                >
                                    -
                                </button>
                                <div className="{productQuantity}">{product.quantity}</div>
                                <button
                                    className="{cartButton}"
                                    onClick={() => handleIncrement(product.id)}
                                >
                                    +
                                </button>
                            </div>

                            <div>
                                <button
                                    className="{DelToCartBtn}"
                                    onClick={() => handleRemove(product.id)}
                                >
                                    Quitar
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="{cartTotal}">
                <div>
                    <span className="{orderNumber}">
                        NRO DE ORDEN: PONER ORDER NUMBER{' '}
                    </span>

                    <h2 className="{userName}">{user ? user.name : 'Guest'}</h2>

                    <p> Articulos: {cartQuantity}</p>
                    <p>
                        Envio: <span>Gratis!</span>
                    </p>
                </div>

                <div className="{totalPrice}">
                    <span>PRECIO TOTAL: ${totalPrice}</span>
                </div>

                <div>
                    {/* <div>
                        <SignUp trigger={triggerPopUpSignUp} setTrigger={setTriggerPopUpSignUp} setLoginTrigger={setTriggerPopUp} />
                    </div>
                    <div>
                        <Login trigger={triggerPopUp} setTrigger={setTriggerPopUp} setTriggerSignUp={setTriggerPopUpSignUp} sethasLogged={sethasLogged} hasLogged={hasLogged} />
                    </div> */}
                    <button
                        className="{user ? cartPay : cartPayRed}"
                        onClick={user ? () => buyFunction() : () => setTriggerPopUp(true)}
                    >
                        {user ? "COMPRAR" : "REGISTRATE!"}
                    </button>
                </div>
            </div>
        </div >
    );
}
Cart.propTypes = { cart: PropTypes.array, setCart: PropTypes.func };
export default Cart;
