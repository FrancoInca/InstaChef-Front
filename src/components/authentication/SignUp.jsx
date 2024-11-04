import {useNavigate} from 'react-router-dom';
import InstaChefLogo from '../../assets/InstaChefLogo.png';
import {useState} from 'react';
import {UserAuth} from '../Auth-context/AuthContext';
import {useDispatch} from 'react-redux';
import {postLogin, postSignUp} from '../../redux/actions';
import {bool, func} from 'prop-types';

export default function SignUp(props) {
  const {signUp, signUpGoogle, user} = UserAuth();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let [users, setUser] = useState({
    correo: '',
    contraseña: '',
    nombre: '',
    apellido: '',
  });

  let [error, setError] = useState('');
  let [errorInput, setErrorInput] = useState({
    correo: '',
    contraseña: '',
    nombre: '',
    apellido: '',
  });

  let validarCorreo =
    /^(([^<>().,;:\s@"]+(\.[^<>().,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let validarContraseña = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
  let validarNombreYApellido = /^[a-zA-Z\s]*$/;

  const handleChange = ({target: {name, value}}) => {
    if (name === 'correo') {
      if (!validarCorreo.test(value)) {
        return setErrorInput({
          ...errorInput,
          correo: 'Escribe un correo válido.',
        });
      } else {
        setUser({
          ...users,
          correo: value,
        });
        setErrorInput({
          ...errorInput,
          correo: '',
        });
      }
    }

    if (name === 'contraseña') {
      if (!validarContraseña.test(value)) {
        return setErrorInput({
          ...errorInput,
          contraseña:
            'Se requiere como mínimo de 8 caracteres, una mayúscula, una minúscula y un número.',
        });
      } else {
        setUser({
          ...users,
          contraseña: value,
        });
        setErrorInput({
          ...errorInput,
          contraseña: '',
        });
      }
    }

    if (name === 'nombre') {
      if (!validarNombreYApellido.test(value)) {
        return setErrorInput({
          ...errorInput,
          nombre: 'Solo se admiten letras y espacios.',
        });
      } else {
        setUser({
          ...users,
          nombre: value,
        });
        setErrorInput({
          ...errorInput,
          nombre: '',
        });
      }
    }

    if (name === 'apellido') {
      if (!validarNombreYApellido.test(value)) {
        return setErrorInput({
          ...errorInput,
          apellido: 'Solo se admiten letras y espacios.',
        });
      } else {
        setUser({
          ...users,
          apellido: value,
        });
        setErrorInput({
          ...errorInput,
          apellido: '',
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signUp(users.correo, users.contraseña);

      dispatch(
        postSignUp({
          name: users.nombre,
          email: users.correo,
          password: users.contraseña,
          lastName: users.apellido,
        })
      );
      props.setTrigger(false);

      setUser({
        correo: '',
        contraseña: '',
        nombre: '',
      });
    } catch (error) {
      if (error.code === 'auth/weak-password') {
        setError('Contraseña débil');
      }
      if (error.code === 'auth/invalid-email') {
        setError('Correo inválido');
      }
      if (error.code === 'auth/email-already-in-use') {
        setError('Correo ya esta en uso');
      }
      console.log(error.code);
    }
  };

  const handleSigUpGoogle = async () => {
    try {
      await signUpGoogle();
      navigate('/');
      dispatch(
        postLogin({
          email: user.email,
          password: '',
        })
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const trigger = () => {
    props.setTrigger(false);
  };

  return props.trigger ? (
    <main className="fixed flex justify-center items-center top-0 left-0 w-full h-screen bg-black bg-opacity-30 backdrop-blur-sm cursor-default z-20">
      <div className="relative px-8 py-8 w-full md:w-2/5 bg-[#24252B] text-gray-200 rounded-10 shadow-md">
        <button
          className="absolute right-4 w-8 h-5 text-white"
          onClick={trigger}
        >
          X
        </button>
        <div className="text-center flex flex-col justify-center items-center">
          <img src={InstaChefLogo} className="w-32 h-32 -mb-8 -mt-8" />
          <div className="">
            <h3 className=" text-2xl font-bold sm:text-3xl">Regístrate</h3>
            <p className="m-0">
              ¿Ya tienes una cuenta?
              <span className="ml-1 mt-1 inline-flex items-center">
                <button
                  className="font-medium text-amber-400 hover:text-gray-100"
                  onClick={(e) => {
                    e.preventDefault();
                    trigger();
                    props.setLoginTrigger(true);
                    props.setTriggerSignUp(false);
                  }}
                >
                  ¡Inicia sesión!
                </button>
              </span>
            </p>
          </div>
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className="mt-4 space-y-5">
          {error && <p className=" text-sm text-red-800">{error}</p>}
          <div>
            <label className="font-medium">Tu nombre</label>
            <input
              onChange={(e) => handleChange(e)}
              name="nombre"
              type="text"
              required
              className="w-full mt-2 px-3 py-2 text-gray-200 bg-transparent outline-none border focus:border-amber-600 shadow-sm rounded-lg"
            />

            {Boolean(errorInput.nombre.length) && (
              <p className="text-[12px] text-red-600 fixed">
                {errorInput.nombre}
              </p>
            )}
          </div>
          <div>
            <label className="font-medium">Tu apellido</label>
            <input
              onChange={(e) => handleChange(e)}
              name="apellido"
              type="text"
              required
              className="w-full mt-2 px-3 py-2 text-gray-200 bg-transparent outline-none border focus:border-amber-600 shadow-sm rounded-lg"
            />
            {Boolean(errorInput.apellido.length) && (
              <p className="text-[12px] text-red-600 fixed">
                {errorInput.apellido}
              </p>
            )}
          </div>
          <div>
            <label className="font-medium">Correo electrónico</label>
            <input
              onChange={(e) => handleChange(e)}
              name="correo"
              type="email"
              required
              className="w-full mt-2 px-3 py-2 text-gray-200 bg-transparent outline-none border focus:border-amber-600 shadow-sm rounded-lg"
            />
            {Boolean(errorInput.correo.length) && (
              <p className="text-[12px] text-red-600 fixed">
                {errorInput.correo}
              </p>
            )}
          </div>
          <div>
            <label className="font-medium">Contraseña</label>
            <input
              onChange={(e) => handleChange(e)}
              name="contraseña"
              type="password"
              required
              className="w-full mt-2 px-3 py-2 text-gray-200 bg-transparent outline-none border focus:border-amber-600 shadow-sm rounded-lg"
            />
            {Boolean(errorInput.contraseña.length) && (
              <p className="text-[12px] text-red-600 fixed">
                {errorInput.contraseña}
              </p>
            )}
          </div>
          <button
            className="w-full px-4 py-2 text-white font-medium hover:text-[#24252B] bg-amber-400 hover:bg-amber-500 active:bg-amber-600 rounded-lg duration-150"
            type="submit"
          >
            Crear cuenta
          </button>
        </form>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleSigUpGoogle();
          }}
          className="w-full flex items-center justify-center gap-x-3 py-2.5 mt-5 border rounded-lg text-sm font-medium hover:bg-gray-50 hover:text-[#24252B] duration-150 active:bg-gray-100"
        >
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
          Continuar con Google
        </button>
      </div>
    </main>
  ) : (
    ''
  );
}
SignUp.propTypes = {
  trigger: bool,
  hasLogged: bool,
  setTrigger: func,
  setLoginTrigger: func,
  setTriggerSignUp: func,
  setHasLogged: func,
};
