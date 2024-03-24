import React, { useState } from "react";
import signupImg from "../assets/images/signup.jpg";
import Input from "../components/form/Input";
import Logo from "../components/form/Logo";
import Button from "../components/form/Button";
import { Link } from "react-router-dom";
import GoogleSignInButton from "../components/form/GoogleSignInButton";
import { useFirebase } from "../config/firebaseinit";

const Signuppage = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //firebase hooks
  const firebase = useFirebase();

  //on signup function
  const handleSubmit = async () => {
    // await firebase.sentUserEmailVerification();
    //sign up process
    const { user } = await firebase.signupUserWithEmailAndPassword(
      email,
      password
    );
    //update to realtime database
    await firebase.putData("users/" + user.uid, { email, phone, fullname });
    //update information
    const updateData = {
      displayName: fullname,
      phoneNumber: phone,
    };
    //update to authentication profile
    await firebase.updateAuthenticatedUserData(updateData);
    const userData = {
      displayName: fullname,
      email: email,
      phoneNumber: phone,
      role: "user",
    };

    await firebase.setDataToFirestoreRef("users", user.uid, userData);
    const userData2 = await firebase.getADocsFromFirestore("users", user.uid)
    console.log("set doc=",userData2);
    const userData3 = await firebase.getMultipleDocsFromFirestore("users", "role", "user")
    console.log("user docs=",userData3);
    const userData4 = await firebase.getAllDocsFromFirestore("users")
    console.log("all docs=",userData4);
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
            value={fullname}
            setValue={setFullname}
          />
          <Input
            label="email"
            type="email"
            id="email"
            value={email}
            setValue={setEmail}
          />
          <Input
            label="phone number"
            type="text"
            id="phone"
            value={phone}
            setValue={setPhone}
          />
          <Input
            label="password"
            type="password"
            id="password"
            value={password}
            setValue={setPassword}
          />
          <Input
            label="confirm password"
            type="password"
            id="confirm-password"
            value={confirmPassword}
            setValue={setConfirmPassword}
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
