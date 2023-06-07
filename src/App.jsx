
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom';

/* Componentes */
import LandingPage from './views/LandingPage/LandingPage';
import NavBar from './components/NavBar';



import Home from "./views/Home/Home"
import Detail from './Componentes/Detail/Detail';
import SignUp from './Componentes/autenticacion/SignUp';
import LogIn from './Componentes/autenticacion/Log-In';
import { AuthProvider } from './Componentes/Auth-contex/AuthContex';



function App() {

 let location =  useLocation()

  return (
    <div className="">
      <AuthProvider>
      { location.pathname === "/LogIn" || location.pathname ===
      "/SignUp" ?  null : <NavBar /> }
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/Detail" element={<Detail/>} />
        <Route exact path='/LogIn' element={<LogIn/>} />
        <Route exact path='/SignUp' element={<SignUp/>} />
        <Route exact path="/Home" element={<Home />} />
      </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
