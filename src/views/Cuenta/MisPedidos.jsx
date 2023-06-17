/* eslint-disable react/no-unknown-property */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { getProductosPagos } from "../../redux/actions";


export default function MisPedidos() {
  let productPagos = useSelector(state => state.productPagos)
  console.log(productPagos)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProductosPagos())
    //eslint-disable-next-line
  }, [])
  return (
    <div className=" flex justify-center ml-32">
      {
        productPagos && productPagos.length ?
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

                          </div>
                        </li>
                      )) : <div>
                        <h1 className="font-bold text-[16px]"> No has  hecho ningún pedido.</h1>
                        <p className="text-[13px]">Cuando compres algún plato de nuestro menu, aparecerá aquí en en este apartado</p>
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
          </section> : null
      }
    </div>
  )
}
