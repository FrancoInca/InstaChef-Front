
import './App.css'
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

/* Componentes */
import LandingPage from './views/LandingPage/LandingPage';
import NavBar from './components/NavBar';


import Home from "./views/Home/Home"
import Detail from './components/Detail';
import Cart from './views/Cart/Cart';
import useLocalStorage from './components/useLocalStorage';

axios.defaults.baseURL = "http://localhost:3001/"

function App() {

  const [cart, setCart] = useLocalStorage('cart', []);

  return (
    <div className="">

      <NavBar />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/Home" element={<Home />} />
        <Route exact path="/Detail" element={<Detail />} />
        <Route exact path="/Cart" element={<Cart cart={cart} setCart={setCart} />} />
      </Routes>
    </div>
  )
}

export default App
