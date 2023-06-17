
import './App.css'

import { Route, Routes, useLocation } from 'react-router-dom';
import axios from 'axios';


/* Componentes */
import LandingPage from './views/LandingPage/LandingPage';
import NavBar from './components/NavBar';

// import SignUp from './components/authentication/SignUp';
// import LogIn from './components/authentication/Log-In';
import { AuthProvider } from './components/Auth-context/AuthContext';

import Home from "./views/Home/Home"
import Detail from './views/Detail/Detail';
import Cart from './views/Cart/Cart';
import useLocalStorage from './components/useLocalStorage';
import Checkout from './views/Pasarela/Checkout';
import ProductForm from './components/ProductForm';
import { ProtectedRoute } from './components/authentication/ProtectedRoute.jsx';
import { useState } from 'react';
import Cuenta from './views/Cuenta/Cuenta';
import Favorites from './views/Favorites/Favorites';



// axios.defaults.baseURL = "https://instachef-back-production.up.railway.app/"
axios.defaults.baseURL = "http://localhost:3001"


function App() {

  let location = useLocation()
  const [cart, setCart] = useLocalStorage('cart', []);

  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  const [hasLogged, sethasLogged] = useState(false);


  return (
    <div className="">
      <AuthProvider>
        {location.pathname === "/LogIn" || location.pathname ===
          "/SignUp" || location.pathname === "/Checkout" ? null
          :
          <NavBar
            hasLogged={hasLogged}
          />}

        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/detail/:id" element={<Detail cart={cart} setCart={setCart} favorites={favorites} setFavorites={setFavorites} />} />
          <Route exact path="/Cart" element={<Cart cart={cart} setCart={setCart} sethasLogged={sethasLogged} />} />
          <Route exact path="/Home" element={<Home />} />
          <Route exact path="/checkout" element={<ProtectedRoute><Checkout cart={cart} setCart={setCart} /></ProtectedRoute>} />
          <Route path='/create' element={<ProductForm />} />
          <Route exact path='/cuenta' element={
            <ProtectedRoute>
              <Cuenta/>
            </ProtectedRoute>
          }/>

          <Route exact path='/favorites' element={<Favorites favorites={favorites} setFavorites={setFavorites} />} />

        </Routes>


      </AuthProvider>
    </div>
  )
}

export default App
