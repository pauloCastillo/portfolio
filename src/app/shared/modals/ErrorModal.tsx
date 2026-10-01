"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "~/store/store";
import { clearError } from "~/store/features/errorSlice";

export default function ErrorModal() {

  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.error.message);

  if (!error) return null;

//   const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
//     // dispatch(clearError());
//     //capturar el click fuera del modal para cerrarlo
//     if (e.target === e.currentTarget) {
//       dispatch(clearError());
//     }
//   }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-blue-900/60 z-50">
      <div className="bg-gray-900 rounded-xl p-6 w-1/2 text-center relative">
        <h2 className="text-red-500 text-3xl font-semibold mb-3">
          Error
        </h2>
        <p className="mt-2 text-gray-400">
          {error}
        </p>
        <button
          onClick={() => dispatch(clearError())}
          className="bg-red-200 hover:bg-red-600 p-2 rounded-full hover:shadow-lg transition duration-300 hover:cursor-pointer absolute top-0 right-0 m-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}