import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import { func, object } from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';

const foodTypes = [
  'Hamburguesas',
  'Pizzas',
  'Frituras',
  'Ensalada',
  'Desayuno',
  'Postre',
];

const servingSizes = ['Individual', 'Bipersonal', 'Familiar'];

const importIngredients = (array) => {
  const newIngredients = [];
  for (let i = 0; i < array.length; i++) {
    let ingredient;
    if (i === 0) ingredient = { name: array[i], id: 'first-item' };
    else ingredient = { name: array[i], id: uuid() };
    newIngredients.push(ingredient);
  }
  return newIngredients;
};

export default function ProductForm({ closeWindow, defaultValues }) {

  const [foodInfo, setFoodInfo] = useState(
    !defaultValues.id
      ? {
        name: '',
        category: '',
        price: 0,
        ingredients: [{ name: '', id: 'first-item' }],
        stock: 0,
        serving_size: [],
        banned: false,
      }
      : {
        ...defaultValues,
        ingredients: importIngredients(defaultValues.ingredients),
      }
  );
  const [errorList, setErrorList] = useState({
    name: '',
    category: '',
    image: '',
    price: '',
    ingredients: '',
    stock: '',
    serving_size: '',
  });

  //Código para cloudinary.

  const [images, setImages] = useState(
    !defaultValues ? {} : { url: defaultValues.image }
  );
  const [imageToRemove, setImageToRemove] = useState('');

  const handleChangeInput = (value, type) => {
    if (type !== 'price' && type !== 'stock')
      return setFoodInfo({ ...foodInfo, [type]: value });
    if (value < 0 || value > 99999)
      return setFoodInfo({ ...foodInfo, [type]: value < 0 ? 0 : 99999 });
    setFoodInfo({ ...foodInfo, [type]: value });
  };

  const handleAddIngredient = () => {
    const ingredientsCopy = foodInfo.ingredients;
    ingredientsCopy.push({ name: '', id: uuid() });
    setFoodInfo({ ...foodInfo, ingredients: ingredientsCopy });
  };

  const handleDeleteIngredient = (id) => {
    const ingredientsCopy = [...foodInfo.ingredients];
    const newArray = ingredientsCopy.filter((e) => e.id !== id);
    console.log(newArray);
    setFoodInfo({ ...foodInfo, ingredients: [...newArray] });
  };

  const renderIngredients = () => {
    const arrayPrueba = foodInfo.ingredients.map((el, i) => (
      <div className="flex items-center justify-around w-full" key={i}>
        <input
          type="text"
          placeholder={`Ingrediente #${i + 1}`}
          className="border border-black text-center p-2 mb-2 w-full"
          value={foodInfo.ingredients[i].name}
          onChange={(e) => {
            const copyIngredients = foodInfo.ingredients;
            copyIngredients[i].name = e.target.value;

            setFoodInfo({ ...foodInfo, ingredients: copyIngredients });
          }}
        />
        {Boolean(i !== 0) && (
          <button
            onClick={(e) => {
              e.preventDefault();
              handleDeleteIngredient(el.id);
            }}
            className="w-[20px] h-[20px] bg-primary-400 ml-3">
            {' '}
            -{' '}
          </button>
        )}
      </div>
    ));
    return arrayPrueba;
  };

  const validate = (food) => {
    const errors = {};
    const validateField = (field, errorMessage) => {
      if (!food[field]) {
        errors[field] = errorMessage;
      }
    };
    validateField('name', 'Se debe introducir un nombre');
    validateField('category', 'Se debe introducir una categoría válida');
    // validateField('image', 'Se debe introducir una imagen');
    validateField('price', 'Se debe introducir un precio válido');
    validateField('stock', 'Se debe introducir un stock válido');
    const ingredients = food.ingredients.filter((e) => e.name !== '');
    if (!ingredients.length)
      errors.ingredients = 'Se necesita de un ingrediente como mínimo.';
    if (!food.serving_size.length)
      errors.serving_size = 'Se debe introducir mínimo un tamaño de porción.';
    if (!images.url) errors.image = 'Se debe introducir una imagen';
    return errors;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const newIngredients = foodInfo.ingredients.filter(
      (e) => e.name !== '' || e.id === 'first-item'
    );
    const ingredientsToBack = newIngredients.map((e) => e.name);
    setFoodInfo({ ...foodInfo, ingredients: newIngredients });
    const result = validate(foodInfo);
    if (Object.keys(result).length) {
      setErrorList(result);
      return;
    }
    setErrorList({
      name: '',
      category: '',
      image: '',
      price: '',
      ingredients: '',
      stock: '',
      serving_size: '',
    });
    const action = defaultValues.id
      ? axios.put('/products/', {
        ...foodInfo,
        image: images.url,
        ingredients: ingredientsToBack,
        id: defaultValues.id,
      })
      : axios.post('/products/', {
        ...foodInfo,
        image: images.url,
        ingredients: ingredientsToBack,
      });
    try {
      const response = await action;
      toast.success(response.data.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } catch (error) {
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  const handleCheckBox = (type) => {
    if (!foodInfo.serving_size.includes(type))
      return setFoodInfo({
        ...foodInfo,
        serving_size: [...foodInfo.serving_size, type],
      });
    const filterSize = foodInfo.serving_size.filter((e) => e !== type);
    setFoodInfo({ ...foodInfo, serving_size: [...filterSize] });
  };

  function handleRemoveImg(imgObj, e) {
    e.preventDefault();
    setImageToRemove(imgObj);
    axios.delete(`/${imageToRemove}`).then(() => {
      setImages({});
      setImageToRemove('');
    });
  }

  function handleOpenWidget(e) {
    e.preventDefault();
    setImages([]);
    let myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dbkwplcjs',
        upload_preset: 'vntmhieb',
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          setImages(() => {
            return { url: result.info.url, public_id: result.info.public_id };
          });
        }
      }
    );

    myWidget.open();
  }

  useEffect(() => {
    setFoodInfo(
      !defaultValues.id
        ? {
          name: '',
          category: '',
          price: 0,
          ingredients: [{ name: '', id: 'first-item' }],
          stock: 0,
          serving_size: [],
          banned: false,
        }
        : {
          ...defaultValues,
          ingredients: importIngredients(defaultValues.ingredients),
        })
  }, [defaultValues])

  return (
    <div className="">
      <div className="static sm:fixed sm:flex justify-center items-center top-0 left-0 w-full sm:h-screen sm:bg-black sm:bg-opacity-30 sm:backdrop-blur-sm cursor-default sm:z-20">
        <div className="flex relative bg-white flex-col text-black sm:m-5 rounded-lg justify-center items-center">
          <button
            className="absolute top-3 right-3"
            onClick={(e) => {
              e.preventDefault();
              closeWindow();
            }}>
            X
          </button>
          <form className="p-10 sm:grid lg:grid-cols-2 gap-5">
            <div className="grid">
              {/* <button id="upload-widget" onClick={(e) => handleOpenWidget(e)} className="border border-black p-2 w-full" >
            Añadir imagen
            </button> */}

              <label className="mb-5">Nombre del plato:</label>
              <input
                type="text"
                value={foodInfo.name}
                onChange={(e) => handleChangeInput(e.target.value, 'name')}
                className="border border-black p-2 w-full"
                placeholder="Nombre"
              />
              <p className="text-red-600 text-sm">{errorList.name}</p>
              <label className="my-5">Tipo de plato:</label>
              <select
                name=""
                id=""
                value={foodInfo.category}
                onChange={(e) => handleChangeInput(e.target.value, 'category')}
                className="border border-black p-2 w-full text-center ">
                <option value="">--Selecciona--</option>
                {foodTypes.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
              <p className="text-red-600 text-sm">{errorList.category}</p>
              <div className="flex justify-between items-center">
                <label className="my-5">Precio:</label>
                <input
                  type="number"
                  value={foodInfo.price}
                  onChange={(e) => handleChangeInput(e.target.value, 'price')}
                  className="border border-black p-2 w-[80px] h-[40px] text-center"
                />
              </div>
              <p className="text-red-600 text-sm">{errorList.price}</p>
              <label className="mb-5">Imagen:</label>
              <button
                className=""
                onClick={(e) => handleRemoveImg(images.public_id, e)}>
                X
              </button>
              {images.url ? (
                <img
                  src={images.url}
                  alt="image not found"
                  className="border border-black p-2 max-w-[200px]"
                  type="url"
                  value={foodInfo.image}
                />
              ) : (
                <div>
                  <button
                    id="upload-widget"
                    onClick={(e) => handleOpenWidget(e)}
                    className="border border-black p-2 w-full">
                    Añadir imagen
                  </button>
                </div>
              )}
              <p className="text-red-600 text-sm">{errorList.image}</p>
              <div className="flex justify-between items-center my-2">
                <label>Stock</label>
                <input
                  type="number"
                  value={foodInfo.stock}
                  onChange={(e) => handleChangeInput(e.target.value, 'stock')}
                  className="border border-black p-2 w-[80px] h-[40px] text-center"
                />
              </div>
              <p className="text-red-600 text-sm">{errorList.stock}</p>
              <label>Tamaño de la porción: </label>
              {servingSizes.map((size) => (
                <div className="flex justify-between" key={size}>
                  <label htmlFor={size}>{size}</label>
                  <input
                    type="checkbox"
                    name=""
                    id={size}
                    checked={foodInfo.serving_size.includes(size)}
                    onChange={() => {
                      handleCheckBox(size);
                    }}
                  />
                </div>
              ))}
              <p className="text-red-600 text-sm">{errorList.serving_size}</p>
              <label className="mt-5">Estatus del platillo:</label>
              <div className="flex justify-between">
                ¿Deshabilitado?
                <input
                  type="checkbox"
                  checked={foodInfo.banned}
                  onChange={() => {
                    setFoodInfo({ ...foodInfo, banned: !foodInfo.banned });
                  }}
                />
              </div>
            </div>
            <div className="w-[250px]">
              <div className="flex justify-between mb-5 items-center w-full">
                <label>Ingredientes</label>
              </div>
              <p className="text-red-600 text-sm">{errorList.ingredients}</p>
              {renderIngredients()}
              <div className="flex w-full justify-center">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddIngredient();
                  }}
                  className="w-[20px] mb-3 sm:mb-0 bg-primary-400">
                  {' '}
                  +{' '}
                </button>
              </div>
            </div>
            <div className="col-span-2 flex flex-col items-center">
              <button
                onClick={(e) => {
                  handleSubmit(e);
                }}
                className="bg-primary-400 p-3 rounded">
                Subir platillo
              </button>
              <ToastContainer />
              {/* <p>{responseMessage}</p> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
ProductForm.propTypes = {
  closeWindow: func,
  defaultValues: object,
  callToast: func,
};
