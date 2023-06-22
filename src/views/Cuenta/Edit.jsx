/* eslint-disable react/no-unknown-property */
import { useState } from "react"
import { editFoto, editNombre } from "../../redux/actions"
import { UserAuth } from "../../components/Auth-context/AuthContext"
import { useDispatch } from "react-redux"

let avatar = "https://i.pinimg.com/564x/c0/c8/17/c0c8178e509b2c6ec222408e527ba861.jpg"
export default function Editar() {
  let { uploadFile } = UserAuth()
  let dispatch = useDispatch()
  const [popUp, setPopUp] = useState(false)
  const [select, setSelect] = useState("")
  const [error, setError] = useState("")
  const [imag, setIma] = useState(null)
  const [nombre, setNombre] = useState("")
  const [loading, setLoading] = useState(null)
  const [aler, setAler] = useState(null)
  const handleSelect = (event) => {
    let valor = event.target.value
    setSelect(valor)
    if (valor === "FT") {
      setNombre("")
      setError("")
    }
    if (valor === "NB") {
      setIma(null)
      setError("")
    }
    if (valor === "") {
      setNombre("")
      setIma(null)
      setError("")
    }
  }
  let handleImage = async (event) => {
    let file = event.target.files[0]
    setLoading("loading...")
    const result = await uploadFile(file)
    setIma(result)
    setLoading(null)
  }
  let handleName = (event) => {
    let value = event.target.value
    setNombre(value)
  }
  const handleSubmit = () => {
    let token = localStorage.getItem("token")
    if (select === "FT") {
      if (!imag) {
        return setError("no has seleccionado ninguna imagen")
      } else {
        dispatch(editFoto({
          token,
          profilePhoto: imag,

        }))
      }
    }
    if (select === "NB") {
      if (!nombre.length) {
        return setError("No has cambiado el nombre")
      } else {
        dispatch(editNombre({
          token,
          newName: nombre
        }))
      }
    }
  }
  const aplicar = () => {
    setPopUp(false)
    setError("")
    setNombre("")
    setIma(null)
    setAler(true)
  }

  return (
    <div>
      
   {
     
     aler === true ?  <div
 
     className="rounded-xl  border border-gray-100 bg-white p-4 shadow-xl"
   >
     <div className="flex items-start gap-4">
       <span className="text-green-600">
         <svg
           xmlns="http://www.w3.org/2000/svg"
           fill="none"
           viewBox="0 0 24 24"
           stroke-width="1.5"
           stroke="currentColor"
           className="h-6 w-6"
         >
           <path
             stroke-linecap="round"
             stroke-linejoin="round"
             d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
           />
         </svg>
       </span>
   
       <div className="flex-1">
         <strong className="block font-medium text-gray-900">Operacion exitosa</strong>
   
         <p className="mt-1 text-sm text-gray-700">
          los cambios se hicieron de manera correcta
         </p>
       </div>
   
       <button onClick={() => setAler(null)} className="text-gray-500 transition hover:text-gray-600">
         <span className="sr-only">Dismiss popup</span>
   
         <svg
           xmlns="http://www.w3.org/2000/svg"
           fill="none"
           viewBox="0 0 24 24"
           stroke-width="1.5"
           stroke="currentColor"
           className="h-6 w-6"
         >
           <path
             stroke-linecap="round"
             stroke-linejoin="round"
             d="M6 18L18 6M6 6l12 12"
           />
         </svg>
       </button>
     </div>
   </div> : null

   }

     
      <button onClick={() => setPopUp(true)} className="block text-white border border-amber-500 bg-transparent hover:bg-amber-400 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " type="button">
        Editar perfil
      </button>


      <div className={popUp === true ? "fixed top-0 left-0 right-0 z-50 flex justify-center items-center  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full" :
        "fixed top-0 left-0 right-0 z-50  hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"}>
        <div className="relative w-full max-w-2xl max-h-full">

          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <div>
                <select onChange={(e) => handleSelect(e)}
                  name="HeadlineAct"
                  id="HeadlineAct"
                  className="mt-1.5 w-full tex-[13px]  outline-none  bg-slate-900 sm:text-sm"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="FT">Foto</option>
                  <option value="NB">Nombre</option>

                </select>
              </div>
              <button onClick={() => setPopUp(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="staticModal">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {
                select === "" ? <p>
                  Elige la opción que quieres editar
                </p> : null
              }

              {
                select === "FT" ? <><aside className="flex justify-center">
                  {
                    !loading ? <img src={!imag ? avatar : imag} alt="perfil" className="w-32 rounded-full" /> : <p>{loading}</p>
                  }
                </aside><aside className="flex justify-center" >
                    <input type="file" onChange={(e) => handleImage(e)} />
                  </aside></> : null
              }
              {
                select === "NB" ? <>
                  <aside className="flex justify-center">
                    <input type="text" onChange={(e) => handleName(e)} placeholder="John Doe" className="w-48 h-7 bg-black text-gray-300 outline-none rounded-sm py-5 px-3" />
                  </aside>
                </>
                  : null}
              {
                error.length ? <p>
                  {
                    error
                  }
                </p> : null
              }
            </div>

            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              {
                select !== "" ? <>
                  <button onClick={() => handleSubmit()} type="button" className="text-white bg-amber-500 hover:bg-amber-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Guardar</button>
                  <button onClick={() => aplicar()
                    
                  } type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 ">Aplicar</button>
                </> : null
              }
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
