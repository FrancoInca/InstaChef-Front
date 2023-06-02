import Expecial from "./Expecial"
import Nav from "./Nav"


function Home() {
  return (
    <div className="">
       <Nav/>
       <div className="flex flex-col items-center justify-center mt-16 ">
        <div className="w-2/3 flex ">
          <h1 className="text-[30px] font-bold text-red-600">
            Especial del Dia
          </h1>
        </div>
         <div className="w-2/3">
         <Expecial/>
         </div>
       </div>
    </div>
  )
}

export default Home