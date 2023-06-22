import axios from "axios"
import { bool, func, object } from "prop-types"
import {toast} from 'react-toastify'

export default function InfoPayment({ payment, trigger, setTrigger }) {

  const sendMail = async (type) => {
    const response = await axios.post("/mail", {email: payment.email, products: payment.name, type})
    if (response.status === 200) toast.success("Se envió el correo",{
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    })
  }


  return (
    trigger && (
      <div className="fixed flex justify-center items-center top-0 left-0 w-full h-screen bg-black bg-opacity-30 backdrop-blur-sm z-20">
        <div className="relative bg-backColor-500  p-8 rounded-md text-left">
          <button className="absolute right-0 top-0 w-5 h-5 m-1 text-white bg-red-600 rounded-md" onClick={() => { setTrigger(false) }}>
            X
          </button>
          <div className="text-center">
            <h1>Pago: </h1>
            <h1>{payment.id}</h1>
          </div>
          <div>
            <div className="m-3">
              <p>Email del consumidor:</p>
              <p>{payment.email}</p>
            </div >
            <div className="m-3">
              <p>Productos a comprar:</p>
              <p>{payment.name}</p>
            </div>
          </div>
          <hr />
          <div className="grid gap-1 text-center m-2 grid-rows-[auto_1fr] grid-cols-2">
            <h1 className="col-span-2">Notificar:</h1>
            <button className="bg-primary-400 p-1 text-black rounded-md" onClick={()=>{
              sendMail("send")
            }}>
              Producto enviado
            </button>
            <button className="bg-primary-400 p-1 text-black rounded-md" onClick={()=>{
              sendMail("delivered")
            }}>
              Producto entregado
            </button>
          </div>
        </div>
      </div>
    )
  )
}
InfoPayment.propTypes = {
  payment: object,
  trigger: bool,
  setTrigger: func,
}