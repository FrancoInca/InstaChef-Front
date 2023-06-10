import { Link, useNavigate } from "react-router-dom";
import InstaChefLogo from "../../assets/InstaChefLogo.png";
import { useState } from "react";
import { UserAuth } from "../../components/Auth-context/AuthContext";
import { useDispatch } from "react-redux";
import { postLogin } from "../../redux/actions";


export default function LogIn() {
  let [error, setError] = useState("");
  const { logIn, user, signUpGoogle } = UserAuth();
  console.log(user);
  let navigate = useNavigate();
  let dispatch = useDispatch()
  let [users, setUser] = useState({
    correo: "",
    contraseña: "",
  });

  let [errorInput, setErrorInput] = useState({
    correo: "",
    contraseña: "",
  })

  let validarCorreo = /^(([^<>().,;:\s@"]+(\.[^<>().,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  let validarContraseña = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

  const handleChange = ({ target: { name, value } }) => {
    if (name === "correo") {
      if (!validarCorreo.test(value)) {
        return setErrorInput({
          ...errorInput,
          correo: "Escribe el coreo correctamente por favor"
        })
      } else {
        setUser({
          ...users,
          correo: value
        })
        setErrorInput({
          ...errorInput,
          correo: ""
        })
      }
    }

    if (name === "contraseña") {
      if (!validarContraseña.test(value)) {
        return setErrorInput({
          ...errorInput,
          contraseña: "Una mayúscula o mas, una minúscula o más, un número, 8 caracteres o más."
        })
      } else {
        setUser({
          ...users,
          contraseña: value
        })
        setErrorInput({
          ...errorInput,
          contraseña: ""
        })
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logIn(users.correo, users.contraseña);
      navigate("/");

      dispatch(postLogin({
        email: users.correo,
        password: users.contraseña
      }))
      console.log("enviado");

      setUser({
        correo: "",
        contraseña: "",

      })
    } catch (error) {
      if (error.code === "auth/user-not-found") setError("Usuario no encontrado")
      console.log(error.code);
      if (error.code === "auth/wrong-password") setError("Contraseña incorrecta")
    }
  };


  const handleSigUpGoogle = async () => {
    try {
      await signUpGoogle()
      navigate("/")
      console.log(user);
    } catch (error) {
      if (error.message === "auth/missing-password") {
        setError("falta la contraseña")
      }
      setError(error.message)
    }

  }

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center sm:px-4">
      <div className="w-full space-y-2 text-gray-600 sm:max-w-md">
        <div className="text-center flex flex-col justify-center items-center">
          <img src={InstaChefLogo} className=" w-32" />
          <div className="mt-1 space-y-2">
            <h3 className="text-gray-300 text-2xl font-bold sm:text-3xl">
              Ingrese a su cuenta
            </h3>
            <p className="text-gray-400">
              No tienes una cuenta?{" "}
              <Link to="/SignUp" className="font-medium text-amber-400 hover:text-gray-100">
                Sign up
              </Link>{" "}
            </p>
          </div>
        </div>
        <div className="bg-white shadow p-4 py-6 space-y-8 sm:p-6 sm:rounded-lg">
          {
            error && <p className="text-sm text-red-800">
              {error}
            </p>
          }
          <div className="grid grid-cols-1">
            <button onClick={() => handleSigUpGoogle()} className="flex items-center justify-center py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
              <svg
                className="w-5 h-5"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_17_40)">
                  <path
                    d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                    fill="#34A853"
                  />
                  <path
                    d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                    fill="#FBBC04"
                  />
                  <path
                    d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                    fill="#EA4335"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_17_40">
                    <rect width="48" height="48" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>

          </div>
          <div className="relative">
            <span className="block w-full h-px bg-gray-300"></span>
            <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">
              O continuar con
            </p>
          </div>

          <form onSubmit={(e) => handleSubmit(e)} className="space-y-5">
            <div>
              <label className="font-medium">Correo electrónico</label>
              <input
                onChange={(e) => handleChange(e)}
                type="email"
                required
                name="correo"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-amber-600 shadow-sm rounded-lg"
              />
              {
                errorInput.correo.length ? <p className="text-[12px] text-red-600 fixed">
                  {errorInput.correo}
                </p> : ""
              }
            </div>
            <div>
              <label className="font-medium">Contraseña</label>
              <input
                onChange={(e) => handleChange(e)}
                type="password"
                required
                name="contraseña"
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-amber-600 shadow-sm rounded-lg"
              />
              {
                errorInput.contraseña.length ? <p className="text-[12px] text-red-600 fixed">
                  {errorInput.contraseña}
                </p> : ""
              }
            </div>
            <button className="w-full px-4 py-2 text-white font-medium bg-amber-400 hover:bg-amber-200 active:bg-amber-600 rounded-lg duration-150">
              Iniciar sesión
            </button>
          </form>
        </div>
        <div className="text-center">
          <a className=" text-gray-400 hover:text-amber-400">
            ¿Has olvidado tu contraseña?
          </a>
        </div>
      </div>
    </main>
  );
}
