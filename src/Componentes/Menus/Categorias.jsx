import { useState } from "react";


let arrayCate = [
    {
       name: "Hamburguesas",
       imagen: "https://i.pinimg.com/564x/89/6c/b7/896cb7994f825c07ccdefab31ca94e49.jpg"
   },
   {
       name: "Pizza",
       imagen: "https://i.pinimg.com/564x/dd/81/91/dd81916bbdfab756da5ad51117bd986a.jpg"
   }

];

function Categorias() {

    let [valor, setValor] = useState("")
    const hanledFilter  = (value) => {
        setValor(value)
    }
  return (
    <section className='flex  flex-wrap  rounded bg-white mt-10 w-2/3 '>
      {
        arrayCate && arrayCate.length ? arrayCate.map( (c, i) => (
            <div key={i} onClick={() => hanledFilter(c.name)}  className={ valor === c.name ? "w-20 pb-3  m-2 h-14 rounded flex flex-col items-center justify-center cursor-pointer transition hover:pb-2" :
             "w-20  m-2 h-14 rounded flex flex-col items-center justify-center cursor-pointer transition hover:pb-2" }>
              <img src={c.imagen} alt={c.name} className="w-7 rounded" />
              <p className="text-black text-[12px]">
                {c.name}
              </p>
            </div>
        ))
     : null  }
    
    </section>
  )
}

export default Categorias