import React, { useState } from "react";
import loginImg from "../assets/images/login.avif";
import Input from "../components/form/Input";
import Logo from "../components/form/Logo";
import Button from "../components/form/Button";
import { Link } from "react-router-dom";
import GoogleSignInButton from "../components/form/GoogleSignInButton";
import { useAuth, useFirestore, useRealtimeDatabase } from "../config/firebaseinit";

const Loginpage = () => {
  //create initial data
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  //set data
  const data = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };
  const [errors, setErrors] = useState([]);
  const auth = useAuth();
  const database = useRealtimeDatabase();
  const store = useFirestore();
  //submit data
  const handleSubmit = async () => {
    let newErrors = [];
    if (!userData.email || !userData.email.includes("@"))
      newErrors.push("email");
    if (!userData.password) newErrors.push("password");
    if (newErrors.length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in all required fields.");
      return;
    }
    await auth.loginUserWithEmailAndPassword(userData.email, userData.password);
    setErrors([]);
  };
  const googleLogin = async () => {
    const { user } = await auth.signInWithGoogle();
    const isExistCart = await store.getADocsFromFirestore("carts", user.uid);
    const isExistOrder = await store.getADocsFromFirestore("orders", user.uid);
    const isExistUser = await store.getADocsFromFirestore("users", user.uid);
    if (!isExistCart || !isExistOrder || !isExistUser) {
      await store.setDataToFirestoreRef("carts", user.uid, {
        createdAt: new Date().toLocaleDateString(),
        carts: [],
      });
      await store.setDataToFirestoreRef("orders", user.uid, {
        createdAt: new Date().toLocaleDateString(),
        orders: [],
      });
      const updateData = {
        displayName: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber?user.phoneNumber:"",
      };
      //update data to cloud firestore also
      await store.setDataToFirestoreRef("users", user.uid, updateData);
      //update to realtime database
      await database.putData("users/" + user.uid, {
        fullname: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber?user.phoneNumber:"",
      });
    }
  };
  return (
    <div className="w-screen h-fit">
      <div className="px-10 py-10 flex">
        <form
          className="w-full md:w-1/2 flex item-center flex-col p-5 gap-4 slide-right"
          onSubmit={handleSubmit}
        >
          <Logo title={"Login"} />
          <Input
            label="email"
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={data}
            errors={errors}
          />
          <Input
            label="password"
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={data}
            errors={errors}
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
          <GoogleSignInButton onClick={googleLogin} />
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
