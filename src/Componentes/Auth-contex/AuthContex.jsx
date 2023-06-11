/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged,
  GithubAuthProvider,
   signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../autenticacion/Firebase-Confi";
import { useDispatch } from "react-redux";
import { postLogin, postSignUp } from "../../redux/actions";
export const context = createContext();

export const UserAuth = () => {
  let authUser = useContext(context);
  return authUser;
};

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const dispacth = useDispatch()
  

  const signUp = (correo, contraseña) =>
    createUserWithEmailAndPassword(auth, correo, contraseña);
    const logIn = (correo, contraseña) => {
      
     return signInWithEmailAndPassword(auth, correo, contraseña);

    }
    
    const signuGogle = () => {
      const googleProvider = new GoogleAuthProvider()
      return  signInWithPopup(auth, googleProvider)
    }

    

    const lognout = () => signOut(auth)
    
    useEffect(() => {
    let unsubscribe = onAuthStateChanged(auth, currentUser  => {
         setUser(currentUser)
         setLoading(false)
         if(currentUser) {
          console.log(currentUser);
          dispacth(postLogin({
            email:  currentUser.email,
            password: ""
            
          }))
         }
      } )
      return () => unsubscribe()
      }, [] )

  return <context.Provider value={{ signUp, logIn, user, lognout, signuGogle, loading}}> {children} </context.Provider>;
}
