import React from "react";

const Input2 = ({Varient="input", type="text", name="", value="", placeholder="", onChange=()=>{}, className=""}) => {
  return (
    <Varient
      className={`"px-8 py-3 outline-none border-b-2 border-b-black  w-full md:w-8/12 focus:border-b-blue-500 ${className}`}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      required
      autoComplete="off"
      onChange={onChange}
    />
  );
};

export default Input2;
