import { string } from 'prop-types';
import { Link } from 'react-router-dom';

export default function ConfirPago({ message }) {
  return (
    <div
      className="fixed z-50 rounded-2xl border border-blue-100 bg-white p-4 shadow-lg max-w-[360px] sm:p-6 lg:p-8"
      role="alert"
    >
      <div className="flex items-center gap-4">
        <span className="shrink-0 rounded-full bg-amber-400 p-2 text-white">
          <svg
            className="h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
              fillRule="evenodd"
            />
          </svg>
        </span>

        <p className="font-medium sm:text-lg">¡Tienes un mensaje!</p>
      </div>

      <p className="mt-4 text-gray-500 ">{message}</p>

      <div className="mt-6 sm:flex sm:gap-4">
        <Link
          to="/home"
          className="mt-2 inline-block w-full rounded-lg bg-amber-500 px-5 py-3 text-center text-sm font-semibold text-gray-100 sm:mt-0 sm:w-auto"
        >
          Ir a el home
        </Link>
      </div>
    </div>
  );
}
ConfirPago.propTypes = {
  message: string,
};
