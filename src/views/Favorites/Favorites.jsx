import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Favorites({ favorites, setFavorites }) {

    const navigate = useNavigate();

    return favorites.length < 1 ? (
        <div className="flex flex-col items-center mt-4">
            <h2 className="text-center">No hay favoritos</h2>
            <button
                onClick={() => navigate("/home")}
                className="flex items-center justify-center m-4 p-4 w-72 rounded-md bg-primary-500 text-bg-stone-100 font-bold text-base cursor-pointer transition duration-200 hover:bg-primary-400"
            >
                Agregar productos
            </button>
        </div>
    ) : (
        <div className="col-span-2">
            {favorites?.map((product) => {
                return (
                    <div className="m-2 mt-3 bg-red-800 rounded-md items-center p-1 h-120px" key={product.id}>
                        <div className="m-0.5 bg-red-800 rounded-sm grid grid-cols-5 items-center p-4 h-120px border-white border">
                            <img src={product.image} alt={product.name}></img>

                            <div className="text-xl ml-6 font-normal text-#202020 font-playfair ">{product.name}</div>

                            <div className="text-lg ml-12 font-normal text-#202020">$ {product.price}</div>

                        </div>
                    </div>
                );
            })}
        </div>
    )
}
Favorites.propTypes = { favorites: PropTypes.array, setFavorites: PropTypes.func };

export default Favorites