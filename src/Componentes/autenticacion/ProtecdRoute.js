/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { UserAuth } from "../Auth-contex/AuthContex";


export  function ProtecdRoute({children}) {
 const {user } =  UserAuth()
 if(!user) return <Navigate  to="/Home" />

  return <>{children}</>

}
