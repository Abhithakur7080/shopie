import React, { useEffect, useState } from "react";
import { icons } from "../../assets";

const Input = ({
  label = "",
  type = "text",
  id = "",
  name = "",
  value = "",
  onChange = () => {},
  setErrors = () => {},
  errors = [],
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [passwordType, setPasswordType] = useState(type);
  const [error, setError] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const togglePassword = (type) => {
    setPasswordType(type === "password" ? "text" : "password");
  };
  useEffect(() => {
    if (errors.length>0 && (errors.indexOf(name) != -1 || value.length === 0)) {
      setError(true);
    } else {
      // const filteredError = errors.filter((err) => err !== name);
      // setErrors(filteredError);
      setError(false);
    }
  }, [errors, error]);
  return (
    <>
      <div
        className={`flex flex-col border-2 relative p-3 ${
          error && "border-red-700 border-2"
        }`}
      >
        <label
          className={`absolute transition-all duration-200 ${
            isFocused || value
              ? "text-sm -top-1 left-2 -translate-y-2 text-gray-500 bg-white"
              : ""
          }`}
          htmlFor={id}
        >
          Enter your {label}
        </label>
        <input
          className="border-none outline-none pl-2 z-20 bg-transparent"
          type={type === "password" ? passwordType : type}
          id={id}
          title={`Enter your ${label}`}
          name={name}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={onChange}
          autoComplete="off"
        />
        {label.includes("password") && (
          <p
            className="absolute right-5 top-4 z-30 cursor-pointer"
            onClick={() => togglePassword(passwordType)}
          >
            {passwordType === "password" ? (
              <icons.FaRegEyeSlash />
            ) : (
              <icons.FaEye />
            )}
          </p>
        )}
      </div>
      {error && <p className="text-red-700 capitalize">{label} is required</p>}
    </>
  );
};

export default Input;
