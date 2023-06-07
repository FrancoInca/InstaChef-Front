
import './App.css'
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

/* Componentes */
import LandingPage from './views/LandingPage/LandingPage';
import NavBar from './components/NavBar';


import Home from "./views/Home/Home"
import Detail from './components/Detail';

axios.defaults.baseURL = "https://instachef-back-production.up.railway.app/"

function App() {
  return (
    <div className="">

      <NavBar />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/Home" element={<Home />} />
        <Route exact path="/Detail" element={<Detail />} />
      </Routes>
    </div>
  )
}

export default App
