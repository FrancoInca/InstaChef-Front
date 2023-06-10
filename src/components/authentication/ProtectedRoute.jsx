import { Navigate } from "react-router-dom";
import { UserAuth } from "../Auth-context/AuthContext";
import { any } from "prop-types";

export function ProtectedRoute({ children }) {
  const { user } = UserAuth()
  if (!user) return <Navigate to="/Home" />
  return <>{children}</>
}
ProtectedRoute.propTypes = {
  children: any
}