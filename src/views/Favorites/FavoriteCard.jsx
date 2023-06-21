import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function FavCard({ id }) {

    const [food, setFood] = useState({
        name: "",
        image: "",
        price: 0
    })

    const getDetail = async (id) => {
        const response = await axios.get(`/products/${id}`);
        const productId = response.data;
        setFood({
            name: productId.name,
            image: productId.image,
            price: productId.price
        })
    }

    useEffect(() => {
        getDetail(id)
        //eslint-disable-next-line
    }, [])


    const navigate = useNavigate()
    return (
        <div className="m-2 mt-3 bg-red-800 rounded-md items-center p-1 h-120px" onClick={() => { navigate(`/detail/${id}`) }}>
            <div className="m-0.5 bg-red-800 rounded-sm grid grid-cols-5 items-center p-4 h-120px border-white border">
                <div>
                    <img src={food.image} alt={food.name} className="max-w-full aspect-video rounded-[10px]" />
                </div>
                <div className="">
                    <p className="text-xl ml-6 font-normal text-#202020 font-playfair">{food.name}</p>
                </div>
                <div>
                    <p className="text-lg ml-12 font-normal text-#202020">${food.price}</p>
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
    image: PropTypes.string
}


export default FavCard