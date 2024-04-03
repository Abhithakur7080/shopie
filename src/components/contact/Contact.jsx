import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRealtimeDatabase } from "../../config/firebaseinit";
import { useNavigate } from "react-router-dom";
import Input2 from "../form/Input2";
import { useAuthContext } from "../../redux/AuthProvider";

const Contact = () => {
  const [userData, setUserData] = useState({
    Name: "",
    Email: "",
    Subject: "",
    Message: "",
  });
  const database = useRealtimeDatabase();
  const { user } = useAuthContext()
  const navigate = useNavigate();
  //authenticated settings
  useEffect(() => {
    if (user) {
      setUserData({
        Name: user?.displayName,
        Email: user?.email,
        Subject: "",
        Message: "",
      });
    } else {
      toast.error("Please login for contact us.");
      navigate("/login");
    }
  }, [user]);
  //setting user data
  const data = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };
  const sendData = () => {
    database.putData("contact_info/" + user.uid, {
      displayName: userData.Name,
      email: userData.Email,
      subject: userData.Subject,
      message: userData.Message,
    });
  };
  return (
    <div className="px-10 py-8 w-full">
      <div>
        <h3 className="text-5xl text-center md:text-left uppercase font-normal text-blue-600">
          # contact us
        </h3>
        <div className="mt-8 px-8 py-5 bg-white w-full md:w-[450px] mx-auto rounded-md shadow-lg">
          <form
            method="POST"
            className="flex flex-col items-center"
            onSubmit={sendData}
          >
            <Input2
              type="text"
              name="Name"
              value={userData.Name}
              placeholder="Enter your full name"
              onChange={data}
            />
            <Input2
              type="email"
              name="Email"
              value={userData.Email}
              placeholder="Enter your email"
              onChange={data}
            />
            <Input2
              type="text"
              name="Subject"
              value={userData.Subject}
              placeholder="Enter your Subject"
              onChange={data}
            />
            <Input2
              Varient="textarea"
              name="Message"
              value={userData.Message}
              placeholder="Your message"
              onChange={data}
            ></Input2>
            {user ? (
              <button
                className="px-10 py-3 bg-black text-white hover:bg-blue-500 mt-5 rounded-md shadow-md uppercase"
                type="submit"
              >
                send
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="px-10 py-3 bg-black text-white hover:bg-blue-500 mt-5 rounded-md shadow-md uppercase"
                type="submit"
              >
                Login to send Message
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
