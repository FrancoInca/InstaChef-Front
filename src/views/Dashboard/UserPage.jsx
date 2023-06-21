import axios from "axios"
import { useEffect, useState } from "react"
import InfoUser from "./InfoUser"

export default function UserPage() {

  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [activeInfo, setActiveInfo] = useState(false)

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get("/users/")
      setUsers(response.data)
    }
    getUsers()
  }, [])

  return (
    <div className="flex w-full justify-center relative">
      <InfoUser user={user} activeInfo={activeInfo} setActiveInfo={setActiveInfo} />
      <div className="flex flex-col bg-backColor-500 min-h-full max-h-full pb-5 w-full max-w-[720px]">
        <div className="grid grid-cols-[1fr_4fr_6fr_1fr] text-center px-5 py-3">
          <p>Id</p>
          <p>Nombre</p>
          <p>Correo</p>
          <p>Info</p>
        </div>
        <ul>
          {users.map((e) => {
            return (
              <li key={e.email} className="grid grid-cols-[1fr_4fr_6fr_1fr] text-center px-5">
                <p>{e.id}</p>
                <p className="whitespace-nowrap truncate sm:scrollbar-thin scrollbar-track-yellow-800 scrollbar-thumb-primary-500">{e.name ? e.name : "Unknown"}</p>
                <p className="whitespace-nowrap truncate">{e.email}</p>
                <div className="w-full flex justify-center">
                  <a
                    onClick={() => {
                      setUser(e)
                      setActiveInfo(true)
                    }}
                    className="bg-primary-400 w-[20px] h-[20px] hover:cursor-pointer"
                  > + </a>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}