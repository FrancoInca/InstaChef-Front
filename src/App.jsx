import './App.css'
import { Route, Routes } from 'react-router-dom';

/* Componentes */
import LandingPage from './views/LandingPage/LandingPage';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
      </Routes>
    </div>
  )
}

export default App
