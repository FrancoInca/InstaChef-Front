import { bool, func, object } from "prop-types"
import axios from "axios"
import { useEffect, useState } from "react"

export default function InfoUser({ user, activeInfo, setActiveInfo }) {

  const [userData, setUserData] = useState(user);
  const [message, setMessage] = useState(" ");

  const banUser = async () => {
    const response = await axios.delete(`/users/${user.id}`);
    if (response.status === 200) return setUserData({ ...userData, banned: response.data });
    setMessage(response.data)
  }

  const fechaCompleta = userData.createdAt;

  // Separar la fecha y la hora utilizando el método split()
  const [fecha,] = fechaCompleta?.split ? fechaCompleta.split("T") : ["", ""];

  useEffect(() => {
    setUserData(user)
    //eslint-disable-next-line
  }, [user, user.banned])

  return (
    activeInfo &&
    (
      <div className="fixed flex justify-center items-center top-0 left-0 w-full h-screen bg-black bg-opacity-30 backdrop-blur-sm z-20">
        <div className="relative bg-backColor-500  p-8 rounded-md">
          <button className="absolute right-0 top-0 w-5 h-5 m-1 text-white bg-red-600 rounded-md" onClick={() => { setActiveInfo(false) }}>
            X
          </button>
          <h1 className="text-xl font-semibold">Información del usuario:</h1>
          <div>
            <div className="m-3">
              <p>Nombre:</p>
              <p>{userData.name || "Desconocido"}</p>
            </div>
            <div className="m-3">
              <p>Correo Electrónico:</p>
              <p>{userData.email}</p>
            </div>
            <div className="m-3">
              <p>Creado:</p>
              <p>{fecha}</p>
            </div>
            <div className="m-3">
              <p>Foto:</p>
              {userData.profilePhoto ? <img src={userData.profilePhoto} alt="Ninguna" /> : <p>Ninguna</p>}
            </div>
            <div className="flex justify-around m-3">
              <p>¿Deshabilitar cuenta?</p>
              <input type="checkbox" checked={userData.banned ?? false} onChange={(e) => {
                banUser(e)
              }} />
            </div>
            <p>{message}</p>
          </div>
        </div>
      </div>
    )
  )
}
InfoUser.propTypes = {
  user: object,
  activeInfo: bool,
  setActiveInfo: func
}