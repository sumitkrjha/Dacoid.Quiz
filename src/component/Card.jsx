import React from "react";

export const Card = ({ children, className }) => {
  return (
    <div
      className={`w-full max-w-xl shadow-2xl rounded-2xl p-6 border-2 border-purple-400 ${className}`}
    >
      {children}
    </div>
  );
};

export const CardContent = ({ children }) => {
  return <div className="p-4">{children}</div>;
};
