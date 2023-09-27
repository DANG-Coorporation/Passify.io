import propType from "prop-types";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

const Toast = ({ header, caption, variant, dismissHandle }) => {
  const [isDismissed, setDissmissed] = useState(false);
  const timer = useRef(null);
  useEffect(() => {
    if (!isDismissed) {
      timer.current = setTimeout(() => {
        setDissmissed(true);
      }, 4000);
    } else {
      timer.current = setTimeout(() => {
        dismissHandle(false);
      }, 200);
    }
  }, [isDismissed, dismissHandle]);
  return (
    <div
      role="alert"
      className={`${
        !isDismissed ? "animate-toast-slideIn" : "animate-toast-slideOut"
      } rounded-xl border border-gray-100 ${
        variant === "error" ? "bg-red-50" : "bg-white"
      } p-4 w-96 absolute top-full right-2 lg:top-2 shadow-md transition-all duration-150 `}
    >
      <div className="flex items-start gap-4">
        <span
          className={variant === "error" ? "text-red-600" : "text-green-600"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            {variant === "error" ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            )}
          </svg>
        </span>

        <div className="flex-1">
          <strong
            className={`block font-medium ${
              variant === "error" ? "text-red-600" : " text-gray-900"
            } `}
          >
            {header}
          </strong>

          <p className="mt-1 text-sm text-gray-700">{caption}</p>
        </div>

        <button
          className="text-gray-500 transition hover:text-gray-600"
          onClick={() => {
            setDissmissed(true);
            // dismissHandle(false);
            clearTimeout(timer.current);
          }}
        >
          <span className="sr-only">Dismiss popup</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

Toast.propTypes = {
  header: propType.string,
  caption: propType.string,
  variant: propType.string,
  dismissHandle: propType.func,
};

export default Toast;
