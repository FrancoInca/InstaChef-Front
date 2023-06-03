import './App.css'
import { Route, Routes } from 'react-router-dom';

/* Componentes */
import LandingPage from './views/LandingPage/LandingPage';
import NavBar from './components/NavBar';

import Home from "./Componentes/Home/Home"
import Menus from "./Componentes/Menus/Menus"

function App() {
  return (
    <div className="">
      <NavBar /> {/* NavBar va afuera para renderizarlo en todas partes de la página */}
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/Home" element={<Home/>} />
        <Route exact path="/Menus" element={<Menus/>} />
      </Routes>
    </div>
  )
}

export default App
