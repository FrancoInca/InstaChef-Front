import image from "../../assets/amburguesa.png"
import {AiOutlineStar, AiFillStar} from "react-icons/ai"
function Detail() {
  return (
    <div className="w-full flex justify-center mt-10">
        <div className=" w-4/5 h-[450px] grid grid-cols-2">
           <div  className="ml-48 flex flex-col justify-center  ">
              <div className="m-5" >
               <label className=" font-bold" >Nombre</label>
               <h1 className=" text-gray-400 text-[12px]">nulla justo</h1>
               <label className=" font-bold">Tipo de comida</label>
               <p className=" text-gray-400 text-[12px]">Tacos</p>
              </div>
              <div className="m-5">
                <label className="font-bold" >Ingredientes</label>
                <p className=" w-44 text-gray-400 text-[12px]">sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula</p>
              </div>
              <div className="m-5 flex justify-between">
                <div className="  ">
                <p className="font-bold">Precio</p>
                <span className=" text-red-600 text-[12px]">$33.85</span>
                </div>
                <div className="flex text-amber-400 mt-1">
                  {
                    [... new Array(5)].map((start, index) => {
                      return index < 4 ? <AiFillStar/> : <AiOutlineStar/>
                    })
                  }
                </div>
              </div>
              <div className=" m-5 flex justify-between">
                <div className="" >
                  <label className="font-bold" >Tiempo de Prearacion</label>
                  <p className="text-gray-400">26 M</p>
                </div>
                <div>
                     <label className=" font-bold">Tamaño de la porcion</label>
                     <p className="text-gray-400">7.91</p>
                </div>
              </div>
           </div>
           
           <div>
            <img src={image} alt="ima" className="" />
           </div>

        </div>

    </div>
  )
}

export default Detail