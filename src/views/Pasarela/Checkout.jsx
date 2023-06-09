
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Formik, Form, Field, ErrorMessage } from "formik"
import Nav from "./Nav"
import ConfirPago from "./ConfirPago"
import { useState } from "react"
let stipePromise = loadStripe("pk_test_51N3WCTG4n6v6zt1DCpKO742a1RORPW5iGwRMf3A1UgkNXuKHXPhTnIJeP9iEnlqlXKUAJ028VgOM9rpPMho3Aplk00FLkHnUtO")

let ChechautForm = () => {
  let stripe = useStripe()
  let element = useElements()
  const [confirmar, setConfirmar] = useState(null)
  const [error, setError] = useState("")

  return (
    <div onClick={() => setConfirmar()} className="text-white flex justify-center items-center gap-20 ml-5 ">
      {
        confirmar === true ? <ConfirPago /> : null
      }
      <div className={confirmar === true ? "w-full opacity-20" : "w-full"}>
        <Formik
          initialValues={{
            nombre: "",
            correo: ""
          }}

          validate={(valors) => {
            let errors = {}
            let { nombre, correo } = valors
            if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(nombre)) {
              errors.nombre = "El nombre solo puede tener letas y espacions"
            }
            if (nombre.length === 0) {
              errors.nombre = "ingrasa tu nombre por favor"
            }

            if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(correo)) {
              errors.correo = "El correo solamente puede contener letras, numeros, puntos, giones y gion bajo"
            }

            if (correo.length === 0) {
              errors.correo = "ingrasa tu correo por favor"
            }
            return errors

          }}

          onSubmit={async (valores, { resetForm }) => {


            let { error, paymentMethod } = await stripe.createPaymentMethod({
              type: "card",
              card: element.getElement(CardElement)
            })
            if (!error) {
              console.log(paymentMethod);
              console.log(valores);
              setConfirmar(true)
              setError("")
              resetForm()
              element.getElement(CardElement).clear()
            } else {
              console.log(error);
              setError(error.message)
            }

          }}
        >
          {({ errors }) => (
            <Form className=" columns-4 gap-5 flex flex-col w-96" >
              <div className="flex flex-col">
                <label htmlFor="">Correo</label>
                <Field type="text" name="correo" className="h-7 mt-1 rounded-lg placeholder-slate-400 text-sm px-3 py-2 focus:outline-none focus:border-verde bg-transparent
                     shadow-lg  focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50  "
                  placeholder="correo@ejemplo.com" />
                {<ErrorMessage name="correo" component={() => (
                  <span className=" text-red-700 text-base ml-3">{errors.correo}</span>
                )} />}
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Nombre</label>
                <Field type="text" name="nombre" placeholder="Toni" className="h-7 mt-1 rounded-lg placeholder-slate-400 text-sm px-3 py-2 focus:outline-none focus:border-verde bg-transparent
                     shadow-lg  focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 " />
                {<ErrorMessage name="nombre" component={() => (
                  <span className=" text-red-700 text-base ml-3">{errors.nombre}</span>
                )} />}
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Numero de la targeta</label>
                <CardElement className="h-7 text-white mt-1 rounded-lg placeholder-slate-400 text-sm px-3 py-2 focus:outline-none focus:border-amber-400 bg-transparent
                     shadow-lg  focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 "/>
              </div>
              {
                error.length ? <p className=" text-sm text-red ">
                  {error}
                </p> : null
              }
              <div className="flex flex-col">
                <button type="submit" disabled={!stripe} className="block w-full rounded border border-amber-600 bg-amber-400 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto">
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
      <div className="w-1/2">

      </div>
    </div>
  )
}



// cke
export default function Checkout() {
  const [confir, setConfir] = useState(false)
  return (
    <main onClick={() => setConfir(null)} className=" w-full   ">

      <div className="w-full">
        <Nav />
      </div>
      <div className="w-full mx-auto px-4 md:px-0  flex justify-center mt-14 ">

        <Elements stripe={stipePromise}>
          <ChechautForm confir={confir} />
        </Elements>

      </div>
    </main>
  )
}