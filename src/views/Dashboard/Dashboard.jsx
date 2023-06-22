import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PaymentsPage from "./PaymentsPage";
import UserPage from "./UserPage";
import FoodPage from "./FoodPage";
import axios from "axios";

export default function Dashboard() {

  const [role, setRole] = useState(null);
  const [actualPage, setActualPage] = useState("users");
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const getRole = async () => {
    const response = await axios.get(`/users/verify/${token}`)
    if (!response.data.role) navigate("/")
    setRole(response.data.role)
  }

  useEffect(() => {
    token && getRole();
    //eslint-disable-next-line
  }, [token])

  const pages = {
    users: <UserPage />,
    foods: <FoodPage />,
    payments: <PaymentsPage />
  }

  return (
    role && (
      <div className="flex flex-col gap-5 w-full">
        <div className="flex justify-center w-full mt-5">
          <div className="flex justify-around bg-backColor-500 p-3 rounded-md w-full max-w-[720px]">
            <a onClick={() => { setActualPage("users") }} className="hover:font-bold hover:cursor-pointer">{actualPage === "users" ? "> Usuarios" : "Usuarios"}</a>
            <a onClick={() => { setActualPage("foods") }} className="hover:font-bold hover:cursor-pointer">{actualPage === "foods" ? "> Comidas" : "Comidas"}</a>
            <a onClick={() => { setActualPage("payments") }} className="hover:font-bold hover:cursor-pointer">{actualPage === "payments" ? "> Pagos" : "Pagos"}</a>
          </div>
        </div>
        <div>
          {pages[actualPage]}
        </div>
      </div>
    )
  )
}