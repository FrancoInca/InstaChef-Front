
import './App.css'
import { Route, Routes } from 'react-router-dom';

/* Componentes */
import LandingPage from './views/LandingPage/LandingPage';
import NavBar from './components/NavBar';


import Home from "./views/Home/Home"
import Detail from './Componentes/Detail/Detail';


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
