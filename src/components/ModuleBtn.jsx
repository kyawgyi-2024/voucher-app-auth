import React from "react";
import { Link } from "react-router-dom";

const ModuleBtn = ({ name, icon, url }) => {
  return (
    <Link
      to={url}
      className="h-full flex flex-col items-center bg-blue-800 text-white p-5 rounded-lg gap-3"
    >
      {/* Icon */}
      {icon}

      {/* Horizontal line above the name */}
      <hr className="w-full border-t-2 border-blue-900" />

      {/* Name */}
      <span className="text-lg">{name}</span>

      
    </Link>
  );
};

export default ModuleBtn;

