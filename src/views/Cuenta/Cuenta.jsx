/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/exhaustive-deps */
import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cuenta, getProductosPagos } from '../../redux/actions'
import General from './General'
import MisDatos from './MisDatos'
import MisPedidos from './MisPedidos'

export default function Cuenta() {
    let token = localStorage.getItem("token")
    let obj = {
         token
    }
    let desplegar = useSelector(state => state.cuenta)

    let dispacth = useDispatch()
    useEffect(() => {
    dispacth(getProductosPagos(obj))
    }, [])
    
  return (


    <div className=' w-4/5 flex ml-12 '> 
        <div className=" w-60 flex h-screen flex-col   justify-between  ">
    <div className="px-4 py-6">
      
  
      <ul className="mt-6 space-y-1 cursor-pointer">
        <li onClick={() => dispacth(cuenta(({
        General: true,
        MisDatos: false,
        MisPedidos: false
    })))}>
          <a
            
            className={desplegar.General === true ? "block rounded-lg  px-4 py-2 text-sm font-medium  text-gray-200 hover:bg-amber-500 bg-amber-500" : 
            "block rounded-lg  px-4 py-2 text-sm font-medium  text-gray-200 hover:bg-amber-500"}
          >
            General
          </a>
        </li>
  
        
  
        <li onClick={() => dispacth(cuenta(({
        General: false,
        MisDatos: true,
        MisPedidos: false
    })))} >
          <a
          
            className={desplegar.MisDatos === true ? "block rounded-lg  px-4 py-2 text-sm font-medium  text-gray-200 hover:bg-amber-500 bg-amber-500" : 
            "block rounded-lg  px-4 py-2 text-sm font-medium  text-gray-200 hover:bg-amber-500"}
          >
           Mis datos
          </a>
        </li>
  
        <li onClick={() => dispacth(cuenta(({
        General: false,
        MisDatos: false,
        MisPedidos: true
    })))}>
          <a
           
            className={desplegar.MisPedidos === true ? "block rounded-lg  px-4 py-2 text-sm font-medium  text-gray-200 hover:bg-amber-500 bg-amber-500" : 
            "block rounded-lg  px-4 py-2 text-sm font-medium  text-gray-200 hover:bg-amber-500"}
          >
            Mis pedidos
          </a>
        </li>
  
       
      </ul>
    </div>
  
    <div className="sticky inset-x-0 bottom-0 ">
      <a  className="flex items-center gap-2  p-4 text-gray-200">
        <img
          alt="Man"
          src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          className="h-10 w-10 rounded-full object-cover"
        />
  
        <div>
          <p className="text-xs">
            <strong className="block font-medium">Eric Frusciante</strong>
  
            <span> eric@frusciante.com </span>
          </p>
        </div>
      </a>
    </div>
  </div>
     <div>
    {  desplegar?.General === true ?  <General /> : null}
      { desplegar?.MisDatos === true ?  <MisDatos/> : null}
      {  desplegar?.MisPedidos === true ?   <MisPedidos/>: null}
     </div>
    </div>


    
  )
}
