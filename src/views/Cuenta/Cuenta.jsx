import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getProductosPagos } from '../../redux/actions'
import General from './General'
import MisDatos from './MisDatos'
import MisPedidos from './MisPedidos'
import { UserAuth } from '../../components/Auth-context/AuthContext'
import axios from 'axios'

export default function Cuenta() {
  let token = localStorage.getItem("token")
  let obj = { token }
  // let desplegar = useSelector(state => state.cuenta)
  const { user } = UserAuth()
  const [userData, setUserData] = useState({})
  const [desplegar, setDesplegar] = useState("General")

  const getUserDetails = async () => {
    const response = await axios.get(`/users/token/${token}`)
    setUserData(response.data)
  }
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProductosPagos(obj))
    // console.log(desplegar)
    getUserDetails()
    //eslint-disable-next-line
  }, [ user ])

  return (


    <div className=' w-4/5 flex ml-12 '>
      <div className=" w-60 flex h-screen flex-col   justify-between  ">
        <div className="px-4 py-6">


          <ul className="mt-6 space-y-1 cursor-pointer">
            <li onClick={() => setDesplegar("General")}>
              <a

                className={desplegar=== "General" ? "block rounded-lg  px-4 py-2 text-sm font-medium  text-gray-200 hover:bg-amber-500 bg-amber-500" :
                  "block rounded-lg  px-4 py-2 text-sm font-medium  text-gray-200 hover:bg-amber-500"}
              >
                General
              </a>
            </li>
            <li onClick={() => setDesplegar("MisDatos")} >
              <a
                className={desplegar === "MisDatos" ? "block rounded-lg  px-4 py-2 text-sm font-medium  text-gray-200 hover:bg-amber-500 bg-amber-500" :
                  "block rounded-lg  px-4 py-2 text-sm font-medium  text-gray-200 hover:bg-amber-500"}
              >
                Mis datos
              </a>
            </li>

            <li onClick={() => setDesplegar("MisPedidos")}>
              <a
                className={desplegar === "MisPedidos" ? "block rounded-lg  px-4 py-2 text-sm font-medium  text-gray-200 hover:bg-amber-500 bg-amber-500" :
                  "block rounded-lg  px-4 py-2 text-sm font-medium  text-gray-200 hover:bg-amber-500"}
              >
                Mis pedidos
              </a>
            </li>
          </ul>
        </div>

        <div className="sticky inset-x-0 bottom-0 ">
          <a className="flex items-center gap-2  p-4 text-gray-200">
            <img
              alt="Man"
              src={userData?.profilePhoto ? userData.profilePhoto : "https://i.pinimg.com/564x/c0/c8/17/c0c8178e509b2c6ec222408e527ba861.jpg"}
              className="h-10 w-10 rounded-full object-cover"
            />

            <div>
              <p className="text-xs">
                <strong className="block font-medium">{userData?.name}</strong>
                <span> {userData?.email} </span>
              </p>
            </div>
          </a>
        </div>
      </div>
      <div>
        {desplegar === "General" ? <General /> : null}
        {desplegar === "MisDatos" ? <MisDatos /> : null}
        {desplegar === "MisPedidos" ? <MisPedidos /> : null}
      </div>
    </div>



  )
}