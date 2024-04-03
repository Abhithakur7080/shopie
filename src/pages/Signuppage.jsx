import React, { useState } from "react";
import signupImg from "../assets/images/signup.jpg";
import Input from "../components/form/Input";
import Logo from "../components/form/Logo";
import Button from "../components/form/Button";
import { Link } from "react-router-dom";
import GoogleSignInButton from "../components/form/GoogleSignInButton";
import {
  useAuth,
  useFirestore,
  useRealtimeDatabase,
} from "../config/firebaseinit";
import toast from "react-hot-toast";

const Signuppage = () => {
  //create initial user data
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    termsCondition: false,
  });
  const [errors, setErrors] = useState([]);

  const data = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };
  //firebase hooks
  const auth = useAuth();
  const database = useRealtimeDatabase();
  const store = useFirestore();

  //on signup function
  const handleSubmit = async () => {
    let newErrors = [];
    if (!userData.fullname) newErrors.push("fullname");
    if (!userData.email || !userData.email.includes("@"))
      newErrors.push("email");
    if (!userData.password) newErrors.push("password");
    if (!userData.phone) newErrors.push("phone");
    if (!userData.confirmPassword) newErrors.push("confirmPassword");
    if (newErrors.length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in all required fields.");
      return;
    }
    if (password.length < 6) {
      setErrors(["password"]);
      toast.error("password should be 6 or more character");
      return;
    }
    if (userData.password !== userData.confirmPassword) {
      setErrors(["password", "confirmPassword"]);
      toast.error("password not matched");
      return;
    }
    if (!userData.termsCondition) {
      toast.error("please accept terms and conditions.");
      return;
    }
    try {
      //sign up process
      const { user } = await auth.signupUserWithEmailAndPassword(
        userData.email,
        userData.password
      );
      //update to realtime database
      await database.putData("users/" + user.uid, {
        fullname: userData.fullname,
        email: userData.email,
        phone: userData.phone,
      });
      //update to authentication profile
      await auth.updateAuthenticatedUserData({
        displayName: userData.fullname,
      });
      const updateData = {
        displayName: userData.fullname,
        email: userData.email,
        phoneNumber: userData.phone,
      };
      //update data to cloud firestore also
      await store.setDataToFirestoreRef("users", user.uid, updateData);
      //at last all errors should be empty
      await store.setDataToFirestoreRef("carts", user.uid, {
        createdAt: new Date().toLocaleDateString(),
        carts: [],
      });
      await store.setDataToFirestoreRef("orders", user.uid, {
        createdAt: new Date().toLocaleDateString(),
        orders: [],
      });
      setErrors([]);
    } catch (error) {
      console.log(error);
    }
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
          <Logo title={"Sign up"} />
          <Input
            label="fullname"
            type="text"
            id="fullname"
            name="fullname"
            value={userData.fullname}
            onChange={data}
            errors={errors}
          />
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
            label="phone number"
            type="text"
            id="phone"
            name="phone"
            value={userData.phone}
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
          <Input
            label="confirm password"
            type="password"
            id="confirm-password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={data}
            errors={errors}
          />
          <label>
            <input
              type="checkbox"
              className="mr-2"
              checked={userData.termsCondition}
              onChange={(e) =>
                setUserData({ ...userData, termsCondition: e.target.checked })
              }
            />
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
          <GoogleSignInButton onClick={googleLogin} />
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
