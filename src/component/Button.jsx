import React from "react";

export const Button = ({ children, className, onClick, disabled }) => {
  return (
    <button
      className={`w-full p-2 rounded-xl border ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
