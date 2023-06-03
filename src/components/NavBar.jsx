import { IconContext } from "react-icons"
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai"
import InstaChefLogo from "../assets/InstaChefLogo.png"
import { Link } from "react-router-dom"
import ListaDesplegable from "./ListaDesplegable"

function NavBar() {
  return (
    <div className="grid bg-[#1E1F22] grid-cols-[1fr_3fr_1fr] h-[80px]">
      <div className="flex items-center justify-center h-[80px]">
        <Link to={"/"}>
          <img src={InstaChefLogo} alt="InstaChefLogo"
            className="max-h-[130px] max-w-[130px]" />
        </Link>
        <Link to="/home">
          <p className="text-white">Menús</p>
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <input type="text" className="border-[1px] border-white block text-white p-3 rounded-lg w-[60%]" placeholder="Buscar" />
      </div>
      <div className="flex items-center justify-center">
        <IconContext.Provider value={{ color: "white", size: "42px" }}>
          <div><AiFillHeart /></div>
          <div><AiOutlineShoppingCart /></div>
          <ListaDesplegable />
        </IconContext.Provider>
      </div>
    </div>
  )
}
export default NavBar