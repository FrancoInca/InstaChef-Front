import { useDispatch } from "react-redux"
import { cuenta } from "../../redux/actions"

export default function General() {
   let dispacth  = useDispatch()
  return (
    <div className="flex justify-center mt-10 gap-5 cursor-pointer">
      <div onClick={() => dispacth(cuenta(({
        General: false,
        MisDatos: true,
        MisPedidos: false
    })))} className=" w-1/2 h-60 bg-amber-400 shadow-xl hover:opacity-50 rounded-md text-black p-5 transition-all hover:shadow-2xl ">
       <h1 className="text-[20px] font-bold">Tus datos</h1>
       <p className="text-[14px]">Mira tus datos y usa las funcinalidades disponibles para personalizarlos</p>
      </div >
      <div  onClick={() => dispacth(cuenta(({
        General: false,
        MisDatos: false,
        MisPedidos: true
    })))} className= " w-1/2 h-60 bg-white shadow-xl hover:opacity-50 rounded-md text-black p-5 ">
      <h1 className="text-[20px] font-bold" >Tus pedidos</h1>
       <p  className="text-[14px]" >Hechale una una mirada a tus pedidos</p>
      </div>
    </div>
  )
}
