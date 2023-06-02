
import ima from "../../assets/amburguesa.png"
function Expecial() {
  return (
    <div className='w-[85%] h-64 bg-white text-black rounded-[10px] grid grid-cols-2'>
        <div className=' -mt-12 flex flex-col justify-center items-center'>
          <div className='flex flex-col ml-10 mb-4  '>
             <h1 className='text-[15px] font-bold'>Hamburgesa-Premiun</h1>
             <p className='text-[12px]'>
                4.5
             </p>
          </div>
          <div className='ml-10 text-[13px] font-medium mb-5'>
           <p>
            Cocacola-bold
           </p>
           <p>
            <p>
              Full-papas  
            </p>
            <p>
                Hamburgase-medium
            </p>
           </p>
          </div>
          <div className='ml-10'>
           <p className='text-[15px] font-medium'>
            Total coste: <span className=' font-normal'>
                $23.43
            </span>
           </p>
          </div>
        </div>
        <div className='flex justify-center '>
            <img src={ima} alt="ima" className='w-[90%] -mt-10' />
        </div>
    </div>
  )
}

export default Expecial