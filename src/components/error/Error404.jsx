import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="h-screen bg-gray-100 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-xl mt-4 text-gray-700">Oops! Pagina non trovata.</p>
      <p className="text-md text-gray-500 mt-2">
        La pagina che stai cercando non esiste o è stata spostata.
      </p>
      <Link
        to="/home"
        className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
      >
        Torna alla Home
      </Link>
    </div>
  );
};

export default Error404;
