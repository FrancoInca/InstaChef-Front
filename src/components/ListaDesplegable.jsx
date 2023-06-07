import { useState } from "react"
import { AiOutlineUser } from "react-icons/ai"

function ListaDesplegable() {

  let [desplege, setDesplegue] = useState(false)

  return (
    <div className="relative">
      <div className="flex items-center overflow-hidden">
        <AiOutlineUser onClick={() => setDesplegue(!desplege)} className="hover:cursor-pointer" />
      </div>
      {desplege &&
        <div
          className="absolute end-0 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg z-20"
          role="menu">
          <div className="p-2">
            <a className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700" role="menuitem">Mi cuenta</a>
            <a href="#" role="menuitem"
              className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700" >Cerrar seccion</a>
          </div>
        </div>
      }
    </div>
  )
}

export default ListaDesplegable