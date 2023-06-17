import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { BiCommentDetail } from "react-icons/bi"
import { MdOutlineReviews } from "react-icons/md";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { setComentario, setReview } from "../../redux/actions";

export default function MisPedidos() {
  let dispatch = useDispatch()
  let productPagos = useSelector(state => state.productPagos)
  const [comentarios, setComentarios] = useState("")
  const [reviewState, setReviewState] = useState(2)
  const [message, setMessage] = useState(null)
  const [popUp, setPopUp] = useState(null)
  const [popUpReview, setPopUpReview] = useState(null)
  const [idReview, setIdReview] = useState(null)
  const [idComment, setIdComment] = useState(null)

  let token = localStorage.getItem("token")
  const reset = () => {

    if (comentarios.length > 1) {
      console.log(idComment, comentarios);
      dispatch(setComentario({
        id: idComment,
        comentarios: comentarios,
        token
      }))
      setMessage(true)
    }

  }

  const resetReview = () => {

    if (reviewState > 0) {
      console.log(idReview, reviewState);
      dispatch(setReview({
        id: idReview,
        reviewState: reviewState,
        token
      }))
      setMessage(true)
    }
  }
  return (
    <div className=" flex justify-center ml-32">
      {

        popUp === true ? <form className=" fixed bg-white z-50  rounded-lg border border-gray-200 shadow-lg">
          <button onClick={() => {
            setPopUp(false)
            setComentarios("")
            setMessage(null)
          }}
            className="absolute -end-1 -top-1 rounded-full  bg-red-600 p-1"
          >
            <span className="sr-only">Close</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <div className="flex flex-col items-center justify-center gap-4 p-4">

            <div className="h-20 w-4/5  ">
              {
                message === true ? <p className="text-[13px] text-center flex items-center h-20 justify-center text-gray-600">Gracias por tu comentario</p> : <input type="text" onChange={(e) => setComentarios(e.target.value)} placeholder="Escribe tu comentario aquí" className=
                  " text-black w-full h-14 py-5 px-3 bg-transparent border border-amber-400 rounded-[7px] outline-none placeholder:text-gray-500 " />
              }
            </div>
            <div className="flex justify-center">
              {
                message === true ? null : <button onClick={() => reset()} type="button" className="w-56 rounded-md h-8 border-none shadow-md hover:border bg-amber-400 hover:border-amber-400 hover:bg-transparent hover:text-black  ">
                  Comentar
                </button>
              }
            </div>
          </div>
        </form> : null

      }

      {
        popUpReview === true ? <div className=" fixed bg-white z-50  rounded-lg border border-gray-200 shadow-lg">
          <button onClick={() => {
            setPopUpReview(null)
            setReviewState()
            setMessage(null)
          }}
            className="absolute -end-1 -top-1 rounded-full  bg-red-600 p-1"
          >
            <span className="sr-only">Close</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {
            message === null ? <>
              <div className="flex text-amber-400 m-20 text-[20px] cursor-pointer">
                <h1 className="text-gray-600 text-[12px] flex justify-center items-center ">Calificación: </h1>
                {
                  [... new Array(5)].map((start, index) => {
                    return index < reviewState ? <AiFillStar onClick={() => setReviewState(index)} key={index} /> :
                      <AiOutlineStar onClick={() => setReviewState(index + 1)} key={index} />
                  })
                }
              </div>

              <div className="flex justify-center items-center m-10">
                <button onClick={() => resetReview()} className="w-56 rounded-md h-8 border-none shadow-md hover:border bg-amber-400 hover:border-amber-400 hover:bg-transparent hover:text-black">
                  Guardar
                </button>
              </div>
            </> : <p className="text-[13px] text-center flex items-center h-20 justify-center text-gray-600 m-20" >
              gracias por calificar este plato
            </p>
          }

        </div> : null
      }
      <section>
        <div className="mx-auto  px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <header className="text-center">
              <h1 className="text-xl font-bold  sm:text-3xl">Tus pedidos</h1>
            </header>

            <div className="mt-8">
              <ul className="space-y-4">
                {
                  productPagos && productPagos.length ? productPagos.map(p => (
                    <li key={p.id} className="flex items-center gap-4">
                      <img
                        src={p.image}
                        alt="image"
                        className="h-16 w-16 rounded object-cover"
                      />

                      <div>
                        <h3 className="text-sm text-gray-100">{p.name}</h3>

                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-200">
                          <div>
                            <dt className="inline">Categoría: </dt>
                            <dd className="inline">{p.category}</dd>
                          </div>

                          <div>
                            <dt className="inline">Precio: </dt>
                            <dd className="inline">{p.price}</dd>
                          </div>
                        </dl>
                      </div>

                      <div className="flex flex-1 items-center justify-end gap-2">
                        <div>

                          <button onClick={() => {
                            setPopUp(true)
                            setIdComment(p.id)
                          }} className="text-[11px] text-gray-400">
                            <span>
                              <BiCommentDetail />
                            </span>
                            Comentar
                          </button>
                        </div>
                        <div>
                          <button onClick={() => {
                            setPopUpReview(true)
                            setIdReview(p.id)
                          }} className="text-[11px] text-gray-400 ">
                            <span>
                              <MdOutlineReviews />
                            </span>
                            Review
                          </button>
                        </div>
                      </div>
                    </li>
                  )) : <div>
                    <h1 className="font-bold text-[16px]"> No has hecho ningún pedido.</h1>
                    <p className="text-[13px]">Cuando compres algún plato de nuestro menu aparecerá aquí en este apartado</p>
                  </div>
                }
              </ul>

              <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                <div className="w-screen max-w-lg space-y-4">


                  <div className="flex justify-end">
                  </div>

                  <div className="flex justify-end">
                    <Link to="/Home" className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600">
                        Ver menu
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
