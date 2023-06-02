
import { Route, Routes} from "react-router-dom"
import './App.css'
import Home from "./Componentes/Home/Home"
import Menus from "./Componentes/Menus/Menus"
function App() {


  return (
    <div className="">
      <Routes>
        <Route exact path="/Home" element={<Home/>} />
        <Route exact path="/Menus" element={<Menus/>} />
      </Routes>
    </div>
  )
}

export default App
