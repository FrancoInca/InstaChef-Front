function LandingPage() {
  return (
    <div className="text-white flex justify-center max-w-[100vw]:">
      <div className="w-[90%] max-w-[1280px] ">
        <p className="pb-2">Menú recomendado del día:</p>
        <div className="grid grid-cols-[3fr_1fr] gap-5">
          <div className="flex">
            <div className="w-[100%] bg-slate-500 aspect-video align-middle rounded-xl flex flex-col justify-end text-left bg-[url(https://assets.kraftfoods.com/recipe_images/opendeploy/94128_640x428.jpg)] bg-no-repeat bg-cover">
              <div className="bg-slate-600/75 p-4 rounded-b-xl">
                <p className="pb-2 font-bold">Bistec a la parrilla</p>
                <p>Un delicioso almuerzo que te dejará contento</p>
              </div>
            </div>
          </div>
          <div className="grid grid-rows-3 gap-2 text-center">
            <div className=" w-[100%] bg-slate-400 aspect-video rounded-lg flex flex-col justify-center">
              <p className="block">Desayuno</p>
            </div>
            <div className=" w-[100%] bg-slate-400 aspect-video rounded-lg flex flex-col justify-center">
              <p className="block">Almuerzo</p>
            </div>
            <div className=" w-[100%] bg-slate-400 aspect-video rounded-lg flex flex-col justify-center">
              <p className="block">Cena</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[100%]">
          <p className="text-left pt-8">Nuevas comidas</p>
          <div className="flex justify-center text-center items-center">
            <button className="bg-primary-500 block h-[80px] p-1 rounded-md">{"<"}</button>
            <div className="grid grid-cols-3 w-[100%] gap-8 m-6">
              <div className="w-[100%] bg-slate-400 aspect-video rounded-lg flex flex-col justify-center">
                <p className="block">Comida x</p>
              </div>
              <div className=" w-[100%] bg-slate-400 aspect-video rounded-lg flex flex-col justify-center">
                <p className="block">Comida x</p>
              </div>
              <div className=" w-[100%] bg-slate-400 aspect-video rounded-lg flex flex-col justify-center">
                <p className="block">Comida x</p>
              </div>
            </div>
            <button className="bg-primary-500 block h-[80px] p-1 rounded-md">{">"}</button>
          </div>
        </div>
        <div className="flex flex-col w-[100%]">
          <p className="text-left pt-8">Nuevas comidas</p>
          <div className="flex justify-center text-center items-center">
            <button className="bg-primary-500 block h-[80px] p-1 rounded-md">{"<"}</button>
            <div className="grid grid-cols-3 w-[100%] gap-8 m-6">
              <div className="w-[100%] bg-slate-400 aspect-video rounded-lg flex flex-col justify-center">
                <p className="block">Comida x</p>
              </div>
              <div className=" w-[100%] bg-slate-400 aspect-video rounded-lg flex flex-col justify-center">
                <p className="block">Comida x</p>
              </div>
              <div className=" w-[100%] bg-slate-400 aspect-video rounded-lg flex flex-col justify-center">
                <p className="block">Comida x</p>
              </div>
            </div>
            <button className="bg-primary-500 block h-[80px] p-1 rounded-md">{">"}</button>
          </div>
        </div>
      </div>

    </div>
  )
}
export default LandingPage