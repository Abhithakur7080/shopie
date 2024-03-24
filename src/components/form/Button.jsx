import React from "react";
import { Link } from "react-router-dom";

const Button = ({to="", icon="", className='', text='', onClick=()=>{}}) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`w-fit mt-5 py-3 px-5 rounded-md flex items-center shadow-md hover:shadow-lg transition-all ${className}`}
    >
      {text}{icon.length>0 && icon}
    </Link>
  );
};

export default Button;
