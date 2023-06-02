import Nav from "../Home/Nav"
import Categorias from "./Categorias"
import Paginacion from "./Paginacion"
import Card from "./Card"

function Menus() {
  return (
    <div>
      <Nav/>
      <div className="flex justify-center">
        <Categorias/>
      </div>
        <div className="flex justify-center">
        <div className="flex  flex-wrap  rounded  mt-10 w-2/3 ">
         <Card/>
        </div>
      </div>
      <div className="flex justify-center m-5 items-center">
        <Paginacion/>
      </div>
    
    </div>
  )
}

export default Menus