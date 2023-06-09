import { useState } from "react"
import { v4 as uuid } from "uuid"
import axios from "axios"

const foodTypes = ["Hamburguesas", "Pizzas", "Frituras", "Ensalada", "Desayuno", "Postre"]

export default function ProductForm() {

  const [foodInfo, setFoodInfo] = useState({
    name: "",
    category: "",
    image: "",
    price: 0,
    ingredients: [{ name: "", id: "first-item" }],
    stock: 0,
    serving_size: []
  })
  const [errorList, setErrorList] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    ingredients: "",
    stock: "",
    serving_size: ""
  })
  const [responseMessage, setResponseMessage] = useState("")

  const handleChangeInput = (value, type) => {
    if (type !== "price" && type !== "stock") return setFoodInfo({ ...foodInfo, [type]: value })
    if (value < 0 || value > 99999) return setFoodInfo({ ...foodInfo, [type]: value < 0 ? 0 : 99999 })
    setFoodInfo({ ...foodInfo, [type]: value })
  }

  const handleAddIngredient = () => {
    const ingredientsCopy = foodInfo.ingredients;
    ingredientsCopy.push({ name: "", id: uuid() })
    setFoodInfo({ ...foodInfo, ingredients: ingredientsCopy })
  }

  const handleDeleteIngredient = (id) => {
    const ingredientsCopy = [...foodInfo.ingredients]
    const newArray = ingredientsCopy.filter((e) => e.id !== id)
    console.log(newArray)
    setFoodInfo({ ...foodInfo, ingredients: [...newArray] })
  }

  const renderIngredients = () => {
    const arrayPrueba = foodInfo.ingredients.map((el, i) =>
    (<div className="flex items-center justify-around w-full" key={i}>
      <input
        type="text"
        placeholder={`Ingrediente #${i + 1}`}
        className="border border-black text-center p-2 mb-2 w-full"
        value={foodInfo.ingredients[i].name}
        onChange={(e) => {
          const copyIngredients = foodInfo.ingredients;
          copyIngredients[i].name = e.target.value;

          setFoodInfo({ ...foodInfo, ingredients: copyIngredients })
        }}
      />
      {Boolean(i !== 0) && <button onClick={(e) => { e.preventDefault(); handleDeleteIngredient(el.id) }} className="w-[20px] h-[20px] bg-primary-400 ml-3"> - </button>}
    </div>)
    )
    return arrayPrueba
  }

  const validate = (food) => {
    const errors = {};
    const validateField = (field, errorMessage) => {
      if (!food[field]) {
        errors[field] = errorMessage;
      }
    };
    validateField("name", "Se debe introducir un nombre");
    validateField("category", "Se debe introducir una categoria válida");
    validateField("image", "Se debe introducir una imagen");
    validateField("price", "Se debe introducir un precio válido");
    validateField("stock", "Se debe introducir un stock válido");
    const ingredients = food.ingredients.filter((e) => e.name !== "")
    if (!ingredients.length) errors.ingredients = "Se necesita de un ingrediente como mínimo."
    if (!food.serving_size.length) errors.serving_size = "Se debe introducir minimo un tamaño de porción."
    return errors
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const newIngredients = foodInfo.ingredients.filter((e) => e.name !== "" || e.id === "first-item")
    const ingredientsToBack = newIngredients.map((e) => e.name)
    setFoodInfo({ ...foodInfo, ingredients: newIngredients })
    const result = validate(foodInfo)
    if (Object.keys(result).length) {
      setErrorList(result);
      return;
    }
    setErrorList({
      name: "",
      category: "",
      image: "",
      price: "",
      ingredients: "",
      stock: "",
      serving_size: ""
    })
    const response = await axios.post("/products/", { ...foodInfo, ingredients: ingredientsToBack })
    setResponseMessage(response.data.message)
  }

  const handleCheckBox = (type) => {
    if (!foodInfo.serving_size.includes(type)) return setFoodInfo({...foodInfo, serving_size: [...foodInfo.serving_size, type]})
    const filterSize = foodInfo.serving_size.filter((e)=> e !== type)
    setFoodInfo({...foodInfo, serving_size:[...filterSize]})
  }

  return (
    <div className="flex items-center justify-center">
      <div className="flex bg-white flex-col text-black m-5 rounded-lg justify-center items-center">
        <form className="p-10 grid grid-cols-2 gap-5">
          <div className="grid">
            <label className="mb-5">Nombre del plato:</label>
            <input type="text" value={foodInfo.name} onChange={(e) => handleChangeInput(e.target.value, "name")} className="border border-black p-2 w-full" placeholder="Nombre" />
            <p className="text-red-600 text-sm">{errorList.name}</p>
            <label className="my-5">Tipo de plato:</label>
            <select name="" id="" value={foodInfo.category} onChange={(e) => handleChangeInput(e.target.value, "category")} className="border border-black p-2 w-full text-center ">
              <option value="">--Selecciona--</option>
              {foodTypes.map((e) => (<option key={e} value={e}>{e}</option>))}
            </select>
            <p className="text-red-600 text-sm">{errorList.category}</p>
            <div className="flex justify-between items-center">
              <label className="my-5">Precio:</label>
              <input type="number" value={foodInfo.price} onChange={(e) => handleChangeInput(e.target.value, "price")} className="border border-black p-2 w-[80px] h-[40px] text-center" />
            </div>
            <p className="text-red-600 text-sm">{errorList.price}</p>
            <label className="mb-5">Imagen:</label>
            <input type="text" value={foodInfo.image} onChange={(e) => handleChangeInput(e.target.value, "image")} className="border border-black p-2 w-full" placeholder="URL de la imagen" />
            <p className="text-red-600 text-sm">{errorList.image}</p>
            <div className="flex justify-between items-center my-2">
              <label>Stock</label>
              <input type="number" value={foodInfo.stock} onChange={(e) => handleChangeInput(e.target.value, "stock")} className="border border-black p-2 w-[80px] h-[40px] text-center" />
            </div>
            <p className="text-red-600 text-sm">{errorList.stock}</p>
            <label>Tamaño de la porción: </label>
            <div>
              <div className="flex justify-between">
                <label htmlFor="Individual">Individual</label>
                <input type="checkbox" name="" id="Individual" checked={foodInfo.serving_size.includes("Individual")} onChange={()=>{handleCheckBox("Individual")}}/>
              </div>
              <div className="flex justify-between">
                <label htmlFor="Bipersonal">Bipersonal</label>
                <input type="checkbox" name="" id="Bipersonal" checked={foodInfo.serving_size.includes("Bipersonal")} onChange={()=>{handleCheckBox("Bipersonal")}}/>
              </div>
              <div className="flex justify-between">
                <label htmlFor="Familiar">Familiar</label>
                <input type="checkbox" name="" id="Familiar" checked={foodInfo.serving_size.includes("Familiar")} onChange={()=>{handleCheckBox("Familiar")}}/>
              </div>
              <p className="text-red-600 text-sm">{errorList.serving_size}</p>
            </div>
          </div>
          <div className="w-[250px]">
            <div className="flex justify-between mb-5 items-center w-full">
              <label>Ingredientes</label>
              <button onClick={(e) => { e.preventDefault(); handleAddIngredient() }} className="w-[20px] bg-primary-400"> + </button>
            </div>
            <p className="text-red-600 text-sm">{errorList.ingredients}</p>
            {renderIngredients()}
          </div>
          <div className="col-span-2 flex flex-col items-center">
            <button onClick={(e) => { handleSubmit(e) }} className="bg-primary-400 p-3 rounded">Subir platillo</button>
            <p>{responseMessage}</p>
          </div>
        </form>
      </div>
    </div>
  )
}