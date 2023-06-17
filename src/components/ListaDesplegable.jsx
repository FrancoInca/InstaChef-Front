import { useState } from "react"
import { UserAuth } from "./Auth-context/AuthContext"
import { Link, useNavigate } from "react-router-dom"

function ListaDesplegable() {
   let navigate = useNavigate()
  let [despliegue, setDespliegue] = useState(false)
  const { logout } = UserAuth()
  const signOut = async() => {
    await logout()
     navigate("/")
  }
  return (
    <div className="relative">
       <div
    className="inline-flex mx-2 items-center overflow-hidden rounded-md border bg-white"
  >
    <a
      href="#"
      className="border-e px-4 py-2 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700"
    >
      Yo
    </a>
        <button onClick={() => setDespliegue(!despliegue)}
      className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
    >
      <span className="sr-only">Menu</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  </div>
  
      {despliegue &&
        <div
          className="absolute end-0 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg z-20"
          role="menu">
          <div className="p-2">
           <Link to="/cuenta" className="block rounded-lg cursor-pointer px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700" role="menuitem" onClick={() => setDespliegue(!despliegue)}>
           Mi cuenta
           </Link>
            <a  onClick={() => {
              signOut()
              setDespliegue(!despliegue)
            }} role="menuitem"
              className="block rounded-lg cursor-pointer px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700" >Cerrar sesión</a>
          </div>
        </div>
      }
    </div>
  )
}

export default ListaDesplegable