
import Editar from "./Edit"
import { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"

let avatar = "https://i.pinimg.com/564x/c0/c8/17/c0c8178e509b2c6ec222408e527ba861.jpg"

export default function MisDatos() {
  const token = localStorage.getItem("token")
  const [userData, setUserData] = useState({})

  const getUserDetails = async () => {
    const response = await axios.get(`/users/token/${token}`)
    setUserData(response.data)
  }

  let useData = useSelector(state => state.userData)
  useEffect(() => {
    getUserDetails()
    //eslint-disable-next-line
  }, [useData])
  return userData && (
    <div className="ml-20 gap-5 py-5 px-5">
      <div className="">
        <img src={userData?.profilePhoto ? userData?.profilePhoto : avatar} alt="avatar" className=" rounded-full w-40 " />
      </div>
      <h1 className=" font-medium ml-3 mt-2 text-[20px] ">{userData?.name}</h1>
      <div>
        <aside className="mt-5 ml-3">
          <p className=" text-gray-500 text-[13px]">{userData?.email}</p>
        </aside>
        <aside className="mt-5 ml-3">
        <Editar/>
        </aside>
      </div>
      <div className="flex justify-center items-center">
      
      </div>
    </div>
  )
}
