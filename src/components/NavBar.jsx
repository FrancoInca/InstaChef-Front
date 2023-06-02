import { IconContext } from "react-icons"
import { AiFillHeart, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai"
function NavBar() {
  return (
    <div className="grid bg-[#1E1F22] grid-cols-[1fr_3fr_1fr] h-[80px]">
      <div className="flex items-center justify-center">
        <p className="text-white font-bold text-3xl">Insta Chef</p>
      </div>
      <div className="flex items-center justify-center">
        <input type="text" className="border-[1px] border-white block text-white p-3 rounded-lg w-[60%]" placeholder="Buscar" />
      </div>
      <div className="flex items-center justify-center">
        <IconContext.Provider value={{ color: "white", size: "42px" }}>
          <div><AiFillHeart /></div>
          <div><AiOutlineShoppingCart /></div>
          <div><AiOutlineUser /></div>
        </IconContext.Provider>
      </div>
    </div>
  )
}
export default NavBar