import Image from "../../assets/amburguesa.png"

function Card() {
  return (
    <div className='w-48 h-48 flex flex-col items-center hover:border border-white rounded shadow-lg'>
        <img src={Image}
         alt="habur" className="w-[80%] h-36 " />
        <div className="flex w-full ">
          <p className="ml-6 text-[15px] font-medium ">
            Haburguesa-basic
          </p>
        </div>
        <div className="flex w-full justify-around gap-5 text-[13px] ">
          <p className=" text-amber-400">
            4.5
          </p>
          <p className=" text-red-700">
             $23.92
          </p>
        </div>
    </div>
  )
}

export default Card