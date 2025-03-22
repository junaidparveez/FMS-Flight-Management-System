import React from "react";

export function Button({ children, onClick, className = "", type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-blue-600 text-black px-4 py-2 rounded-lg hover:bg-blue-700 ${className}`}
    >
      {children}
    </button>
  );
}
