/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged,
  GithubAuthProvider,
   signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../autenticacion/Firebase-Confi";
export const context = createContext();

export const UserAuth = () => {
  let authUser = useContext(context);
  return authUser;
};

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null)

  const signUp = (correo, contraseña) =>
    createUserWithEmailAndPassword(auth, correo, contraseña);
    const logIn = (correo, contraseña) =>
    signInWithEmailAndPassword(auth, correo, contraseña);

    const signuGogle = () => {
      const googleProvider = new GoogleAuthProvider()
      return  signInWithPopup(auth, googleProvider)
    }

    const loginGithab = () => {
       const providerGihab = new GithubAuthProvider()
       return signInWithPopup(auth, providerGihab)
    }

    const lognout = () => signOut(auth)
    
    useEffect(() => {
      onAuthStateChanged(auth, currentUser  => {
         setUser(currentUser)
         console.log(currentUser);
      } )
      }, [] )

  return <context.Provider value={{ signUp, logIn, user, lognout, signuGogle, loginGithab }}> {children} </context.Provider>;
}
