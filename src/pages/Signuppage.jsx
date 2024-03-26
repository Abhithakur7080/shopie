import React, { useState } from "react";
import signupImg from "../assets/images/signup.jpg";
import Input from "../components/form/Input";
import Logo from "../components/form/Logo";
import Button from "../components/form/Button";
import { Link } from "react-router-dom";
import GoogleSignInButton from "../components/form/GoogleSignInButton";
import { useFirebase } from "../config/firebaseinit";
import toast from "react-hot-toast";

const Signuppage = () => {
  //create initial user data
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState([]);

  const data = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };
  //firebase hooks
  const firebase = useFirebase();

  //on signup function
  const handleSubmit = async () => {
    if (!userData.fullname) setErrors((prev) => [...prev, "fullname"]);
    if (!userData.email) setErrors((prev) => [...prev, "email"]);
    if (!userData.password) setErrors((prev) => [...prev, "password"]);
    if (!userData.phone) setErrors((prev) => [...prev, "phone"]);
    if (!userData.confirmPassword) {
      setErrors((prev) => [...prev, "confirmPassword"]);
    }
    console.log(errors.length);
    if (errors.length > 0) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (userData.password !== userData.confirmPassword) {
      setErrors(["password", "confirmPassword"]);
      toast.error("password not matched");
      return;
    }
    console.log("object");
    //sign up process
    const { user } = await firebase.signupUserWithEmailAndPassword(
      userData.email,
      userData.password
    );
    //update to realtime database
    await firebase.putData("users/" + user.uid, {
      fullname: userData.fullname,
      email: userData.email,
      phone: userData.phone,
    });
    //update to authentication profile
    await firebase.updateAuthenticatedUserData({
      displayName: userData.fullname,
    });
    const updateData = {
      displayName: userData.userData,
      email: userData.email,
      phoneNumber: userData.phone,
      role: "user",
    };
    //update data to cloud firestore also
    await firebase.setDataToFirestoreRef("users", user.uid, updateData);
  };
  return (
    <div className="w-screen h-fit">
      <div className="px-10 py-10 flex">
        <form
          className="w-full md:w-1/2 flex item-center flex-col p-5 gap-4 slide-right"
          onSubmit={handleSubmit}
        >
          <Logo title={"Sign up"} />
          <Input
            label="fullname"
            type="text"
            id="fullname"
            name="fullname"
            value={userData.fullname}
            onChange={data}
            errors={errors}
            setErrors={setErrors}
          />
          <Input
            label="email"
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={data}
            errors={errors}
            setErrors={setErrors}
          />
          <Input
            label="phone number"
            type="text"
            id="phone"
            name="phone"
            value={userData.phone}
            onChange={data}
            errors={errors}
            setErrors={setErrors}
          />
          <Input
            label="password"
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={data}
            errors={errors}
            setErrors={setErrors}
          />
          <Input
            label="confirm password"
            type="password"
            id="confirm-password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={data}
            errors={errors}
            setErrors={setErrors}
          />
          <label>
            <input type="checkbox" className="mr-2" />
            Please accept our{" "}
            <Link className="text-blue-600">Terms and conditions</Link>
          </label>
          <Button
            onClick={handleSubmit}
            text="Join"
            className="bg-black text-white hover:bg-blue-600 hover:text-white"
          />
          <p className="text-center text-2xl">
            Heyy you are already in our team, please login{" "}
            <Link to={"/login"} className="text-blue-600 font-bold underline">
              here
            </Link>
            .
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
            src={signupImg}
            alt="noImage"
            className="w-full h-full max-h-[80vh]"
          />
        </div>
      </div>
    </div>
  );
};

export default Signuppage;
