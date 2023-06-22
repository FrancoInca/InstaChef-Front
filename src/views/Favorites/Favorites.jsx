import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FavCard from "./FavoriteCard";
import { UserAuth } from "../../components/Auth-context/AuthContext";

function Favorites({ favorites, setFavorites }) {

    const { user } = UserAuth();
    let token = localStorage.getItem("token");

    const [mounted, setMounted] = useState(false)

    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    const getUserDetails = async () => {
        try {
            const response = await axios.get(`/users/token/${token}`)
            setUserData(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUserDetails();
        //eslint-disable-next-line
    }, [user, mounted]);

    let userFavorites = userData?.favorite || [];

    // let localStorageFav = localStorage.getItem("favorites");
    // let hasFavStorage = localStorageFav ? JSON.parse(localStorageFav) : [];

    const fusionFavorites = async () => {
        const userId = userData.id;
        const response = await axios.put(`/users/${userId}/favorites`, { productId: favorites });
        console.log(response.status)
    }

    useEffect(() => {
        fusionFavorites()
        return () => { setFavorites([]) }
        //eslint-disable-next-line
    }, [user, mounted])


    // const deleteButton = async (productId) => {
    //     const response = await axios.put(`/users/${userId}/favorites`, { productId: [productId] });
    //     console.log(response.data)
    // }


    return userFavorites.length < 1 ? (
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
        <div className="grid grid-cols-2 max-md:block">
            {userFavorites.map((product) => {
                return (<FavCard key={product} id={product} mounted={mounted} setMounted={setMounted} />)
            })}
        </div>
    )
}
Favorites.propTypes = { favorites: PropTypes.array, setFavorites: PropTypes.func };

export default Favorites