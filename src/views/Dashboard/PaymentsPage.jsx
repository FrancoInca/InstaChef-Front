import axios from "axios"
import { useEffect, useState } from "react"
import InfoPayment from "./InfoPayment"

export default function PaymentsPage() {

  const [payments, setPayments] = useState([])
  const [infoPayment, setInfoPayment] = useState({})
  const [trigger, setTrigger] = useState(false)

  const token = localStorage.getItem("token")

  const getPayments = async () => {
    const response = await axios.get(`/payments/all/${token}`);
    console.log(response.data)
    setPayments(response.data)
  }

  useEffect(() => {
    getPayments()
    //eslint-disable-next-line
  }, [])
  return (
    <div className="flex w-full text-center justify-center">
      <InfoPayment payment={infoPayment} trigger={trigger} setTrigger={setTrigger} />
      <div className="w-full items-center bg-backColor-500 max-w-[720px] p-5">
        <div className="grid grid-cols-[5fr_1fr_1fr] w-full mb-5">
          <p>Pedido</p>
          <p>Pago</p>
          <p>Más</p>
        </div>
        {payments.map((e) =>
        (
          <div key={e.id}>
            <div className="grid grid-cols-[5fr_1fr_1fr] w-full max-w-[720px] align-middle py-3">
              {/* {<p className="whitespace-nowrap truncate mx-2">{e.name}</p>} */}
              <ul className="whitespace-nowrap truncate w-full">
                {e.name.split(",").map((e) => (
                  <li key={e} className="text-left "> - {e}</li>
                ))}
              </ul>
              <div className="h-full w-full flex items-center justify-center">
                <p>${e.amount / 100}</p>
              </div>
              <div className="h-full w-full flex items-center justify-center">
                <button onClick={() => {
                  setInfoPayment(e)
                  setTrigger(true)
                }}>+</button>
              </div>
            </div>
            <hr />
          </div>
        )
        )}
      </div>
    </div>
  )
}