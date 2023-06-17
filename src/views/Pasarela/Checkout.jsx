/* eslint-disable react/prop-types */

import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Formik, Form, Field, ErrorMessage } from "formik"
import Nav from "./Nav"
import ConfirPago from "./ConfirPago"
import { useState } from "react"
import axios from "axios"
import { UserAuth } from "../../components/Auth-context/AuthContext"

let CheckOutForm = ({ cart, setCart }) => {
  let stripe = useStripe()
  let element = useElements()
  const [confirmar, setConfirmar] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const {user} = UserAuth()
  
  const totalPrice = cart.reduce((acc, el) => acc + el.quantity * el.price, 0);
  let ides = cart.map(e => { return { id: e.id, quantity: e.quantity, name: e.name } })
  return (
    <div onClick={() => setConfirmar()} className="text-white flex justify-center items-center gap-20 ml-5 ">
      {
        confirmar === true ? <ConfirPago message={message} /> : null
      }
      <div className={confirmar === true ? " opacity-20" : ""}>
        <Formik
          initialValues={{
            nombre: user?.displayName,
            correo: user?.email
          }}

          validate={(valores) => {
            let errors = {}
            let { nombre, correo } = valores
            if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(nombre)) {
              errors.nombre = "El nombre solo puede tener letras y espacios"
            }
            if (nombre.length === 0) {
              errors.nombre = "Ingresa tu nombre por favor"
            }

            if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(correo)) {
              errors.correo = "El correo solamente puede contener letras, números, puntos, guiones y guion bajo"
            }

            if (correo.length === 0) {
              errors.correo = "Ingresa tu correo por favor"
            }
            return errors

          }}

          onSubmit={async (valores, { resetForm }) => {
            try {
              let { error, paymentMethod } = await stripe.createPaymentMethod({
                type: "card",
                card: element.getElement(CardElement)
              })
              if (!error) {
                let token = localStorage.getItem("token");
                let obj = {
                  amount: totalPrice * 100,
                  email: valores.correo,
                  nombre: valores.nombre,
                  id: paymentMethod.id,
                  idFood: ides,
                  token
                }
                const response = await axios.post("/checkout", obj)
                const pagoData = response.data;
                console.log(pagoData)
                if (response.status === 200) {
                  setConfirmar(true)
                  setMessage(pagoData.message)
                  resetForm()
                  setError("")
                }
                element.getElement(CardElement).clear()
              }
            } catch (err) {
              setConfirmar(true)
              setMessage(err.response.data)
              setCart([])
            }
          }
        }>
          {({ errors }) => (
            <Form className=" columns-4 gap-5 flex flex-col w-96" >
              <div className="flex flex-col">
                <label htmlFor="">Correo</label>
                <Field type="text" name="correo" className="h-7 mt-1 rounded-lg placeholder-slate-400 text-sm px-3 py-2 focus:outline-none focus:border-verde bg-transparent
                     shadow-lg  focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50  "
                  placeholder="correo@ejemplo.com"/>
                {<ErrorMessage name="correo" component={() => (
                  <span className=" text-red-700 text-base ml-3">{errors.correo}</span>
                )} />}
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Nombre</label>
                <Field type="text" name="nombre" placeholder="John Doe" className="h-7 mt-1 rounded-lg placeholder-slate-400 text-sm px-3 py-2 focus:outline-none focus:border-verde bg-transparent
                     shadow-lg  focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 " />
                {<ErrorMessage name="nombre" component={() => (
                  <span className=" text-red-700 text-base ml-3">{errors.nombre}</span>
                )} />}
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Numero de la tarjeta</label>
                <CardElement className="h-7 text-white mt-1 rounded-lg placeholder-slate-400 text-sm px-3 py-2 focus:outline-none focus:border-amber-400 bg-transparent
                     shadow-lg  focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 "/>
              </div>
              {
                error.length ? <p className=" text-sm text-red ">
                  {error}
                </p> : null
              }
              <div className="flex flex-col">
                <button type="submit" disabled={!stripe} className="block w-full rounded border border-amber-600 bg-amber-400 px-12 py-3 text-sm font-medium text-backColor-500 hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto">
                  {
                    confirmar ? <p className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      role="status">
                      <span
                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                      >Loading...</span >
                    </p> : "Comprar"}
                </button>
              </div>
            </Form>
          )}
        </Formik>

      </div>
      <div className="w-1/2 ">

        {
          cart?.map((product) => {
            return (
              <div key={product.id} className="grid grid-cols-4 m-2" >

                <img src={product.image} alt="image" className="w-14 rounded-sm" />

                <div className="col-span-2 -ml-3">
                  <p className=" text-[15px] text-[#FEFEFE]"><span className="text-gray-400 ">x{product.quantity}</span>  {product.name} </p>
                </div>

                <div className="ml-3">
                  <p className=" text-[15px] text-[#FEFEFE] ">${product.price}</p>
                </div>
              </div>
            )
          })
        }
        {totalPrice > 1 ? <div className="flex justify-center">
          <h1 className="text-amber-400 ">
            Precio total: ${totalPrice}
          </h1>
        </div> : ""}
      </div>
    </div>
  )
}



// cke
export default function Checkout({ cart, setCart }) {

  const [stripePromise] = useState(() => loadStripe("pk_test_51NH9ifL0oVvgXqTd0Xquw1eYSphWzmlYMT1PeWNe60tzfX12OVmLati1iroYU4O0WHnw2WuwOxf0kmHYEY3WsPiR00BbsfJlTv"))

  return (
    <main className=" w-full   ">

      <div className="w-full">
        <Nav />
      </div>
      <div className="w-full mx-auto px-4 md:px-0  flex justify-center mt-14 ">

        <Elements stripe={stripePromise}>
          <CheckOutForm cart={cart} setCart={setCart} />
        </Elements>
      </div>
    </main>
  )
}