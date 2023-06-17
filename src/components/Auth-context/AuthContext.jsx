import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, storage } from "../authentication/Firebase-Config";
import { useDispatch } from "react-redux";
import { postLogin } from "../../redux/actions";
import { any } from "prop-types";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

//eslint-disable-next-line
export const context = createContext();

export const UserAuth = () => {
  let authUser = useContext(context);
  return authUser;
};

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()


  const signUp = (correo, contraseña) =>
    createUserWithEmailAndPassword(auth, correo, contraseña);
  const logIn = (correo, contraseña) => {

    return signInWithEmailAndPassword(auth, correo, contraseña);

  }

  const signUpGoogle = () => {
    const googleProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleProvider)
  }



  const logout = () => signOut(auth)

  const uploadFile = async (file) => {
     const storageRef = ref(storage, v4())
       await uploadBytes(storageRef, file)
     let url =   getDownloadURL(storageRef)
     return url
  }

  useEffect(() => {
    let unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setLoading(false)
      if (currentUser) {
        dispatch(postLogin({
          email: currentUser.email,
          password: ""

        }))
      }
    })
    return () => unsubscribe()
  }, [dispatch])

  return <context.Provider value={{ signUp, logIn, user, logout, signUpGoogle, loading, uploadFile }}> {children} </context.Provider>;
}
AuthProvider.propTypes = {
  children: any
}