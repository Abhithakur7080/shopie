import React, { useState } from "react";
import loginImg from "../assets/images/login.avif";
import Input from "../components/form/Input";
import Logo from "../components/form/Logo";
import Button from "../components/form/Button";
import { Link } from "react-router-dom";
import GoogleSignInButton from "../components/form/GoogleSignInButton";
import { useFirebase } from "../config/firebaseinit";

const Loginpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const firebase = useFirebase();
  const handleSubmit = async () => {
    await firebase.loginUserWithEmailAndPassword(email, password);
  };
  return (
    <div className="w-screen h-fit">
      <div className="px-10 py-10 flex">
        <form
          className="w-full md:w-1/2 flex item-center flex-col p-5 gap-4 slide-right"
          onSubmit={handleSubmit}
        >
          <Logo title={"Login"}/>
          <Input
            label="email"
            type="email"
            id="email"
            value={email}
            setValue={setEmail}
          />
          <Input
            label="password"
            type="password"
            id="password"
            value={password}
            setValue={setPassword}
          />
          <label>
            <input type="checkbox" className="mr-2" />
            Remember me.
          </label>
          <Button
            onClick={handleSubmit}
            text="Login"
            className="bg-black text-white hover:bg-blue-600 hover:text-white"
          />
          <p className="text-center text-2xl">
            Heyy are you new here.{" "}
            <Link to={"/signup"} className="text-blue-600 font-bold underline">
              Join
            </Link>{" "}
            with us.
          </p>
          <div className="flex items-center justify-center my-4">
            <hr className="w-1/4 border-gray-300" />
            <p className="mx-4 text-gray-500">OR</p>
            <hr className="w-1/4 border-gray-300" />
          </div>
          <GoogleSignInButton onClick={firebase.signInWithGoogle} />
        </form>
        <div className="hidden md:block md:w-1/2 slide-left">
          <img
            src={loginImg}
            alt="noImage"
            className="w-full h-full max-h-[80vh]"
          />
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
