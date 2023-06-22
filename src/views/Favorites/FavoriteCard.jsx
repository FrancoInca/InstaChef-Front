import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { UserAuth } from "../../components/Auth-context/AuthContext"

function FavCard({ id, setMounted, mounted }) {

    const [food, setFood] = useState({
        name: "",
        image: "",
        price: 0
    })

    const getDetail = async (id) => {
        const response = await axios.get(`/products/${id}`);
        console.log(id)
        const productId = response.data;
        setFood({
            name: productId.name,
            image: productId.image,
            price: productId.price
        })
    }

    let token = localStorage.getItem("token");
    const { user } = UserAuth();
    const [userData, setUserData] = useState({});

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


    const userId = userData.id;
    const productId = id;

    const deleteButton = async () => {
        await axios.put(`/users/${userId}/favorites`, { productId: [productId] });
        setMounted(!mounted)
    }

    useEffect(() => {
        getDetail(id)
        //eslint-disable-next-line
    }, [mounted])


    const navigate = useNavigate()
    return (
        <div className="m-2 mt-3 bg-red-800 rounded-md items-center p-1 h-44">
            <div className="m-0.5 bg-red-800 rounded-sm grid grid-cols-5 items-center p-2 h-40 border-white border">
                <div className="col-start-1 col-end-3" onClick={() => { navigate(`/detail/${id}`) }}>
                    <img src={food.image} alt={food.name} className="max-w-[250px] aspect-video rounded-[5px] cursor-pointer" />
                </div>
                <div className="">
                    <p className="text-xl ml-6 font-normal text-#202020 font-playfair">{food.name}</p>
                </div>
                <div>
                    <p className="text-lg ml-12 font-normal text-#202020">${food.price}</p>
                </div>
                <div className="">
                    <button className="" onClick={deleteButton}>
                        X
                    </button>
                </div>
            </div>
        </div>
    )
}
FavCard.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    size: PropTypes.arrayOf(PropTypes.string),
    price: PropTypes.number,
    id: PropTypes.string,
    image: PropTypes.string,
    mounted: PropTypes.bool,
    setMounted: PropTypes.func,
}


export default FavCard