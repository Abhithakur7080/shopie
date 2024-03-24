import React, { useState } from "react";
import { icons } from "../../assets";

function Input({
  label = "",
  type = "text",
  id = "",
  value = "",
  setValue = () => {},
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [passwordType, setPasswordType] = useState(type)

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const togglePassword = (type) => {
    setPasswordType(type === "password" ? "text" : "password");
  };

  return (
    <div className="flex flex-col border-2 relative p-3">
      <label
        className={`absolute transition-all duration-200 ${
          isFocused || value
            ? "text-sm -top-1 left-2 -translate-y-2 text-gray-500 bg-white"
            : ""
        }`}
        htmlFor="input"
      >
        Enter your {label}
      </label>
      <input
        className="border-none outline-none pl-2 z-20 bg-transparent"
        type={type==="password"?passwordType:type}
        id={id}
        title={`Enter your ${label}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        autoComplete="off"
      />
      {label.includes("password") && (
        <p className="absolute right-5 top-4 z-30 cursor-pointer" onClick={() => togglePassword(passwordType)}>
            {passwordType==="password"? <icons.FaRegEyeSlash/> : <icons.FaEye/>}
        </p>
      )}
      
    </div>
  );
}

export default Input;
