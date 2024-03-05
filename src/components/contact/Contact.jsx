import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth0 } from "@auth0/auth0-react";

const Contact = () => {
  const [userData, setUserData] = useState({
    Name: "",
    Email: "",
    Subject: "",
    Message: "",
  });
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();

//   if (isAuthenticated) {
//     setUserData({
//       Name: user?.name,
//       Email: user?.email,
//       Subject: "",
//       Message: "",
//     });
//   }
  let name, value;
  const data = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };
  const sendData = async (e) => {
    e.preventDefault();
    try {
      const { Name, Email, Subject, Message } = user;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name,
          Email,
          Subject,
          Message,
        }),
      };
      const res = await fetch(
        "https://e-shop-a2977-default-rtdb.firebaseio.com/Message.json",
        options
      );
      console.log(res);
      if (res) {
        toast.success("Your Message sent");
      } else {
        toast.error("An error occured!");
      }
    } catch {}
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
            <input
              className="px-8 py-3 outline-none border-b-2 border-b-black w-full md:w-8/12 focus:border-b-blue-500"
              type="text"
              name="Name"
              value={userData.Name}
              placeholder="Enter your full Name"
              required
              autoComplete="off"
              onChange={data}
            />
            <input
              className="px-8 py-3 outline-none border-b-2 border-b-black  w-full md:w-8/12 focus:border-b-blue-500"
              type="email"
              name="Email"
              value={userData.Email}
              placeholder="Enter your E-mail"
              required
              autoComplete="off"
              onChange={data}
            />
            <input
              className="px-8 py-3 outline-none border-b-2 border-b-black  w-full md:w-8/12 focus:border-b-blue-500"
              type="text"
              name="Subject"
              value={userData.Subject}
              placeholder="Enter your Subject"
              required
              autoComplete="off"
              onChange={data}
            />
            <textarea
              className="px-8 py-3 outline-none border-b-2 border-b-black w-full md:w-8/12 focus:border-b-blue-500"
              name="Message"
              value={userData.Message}
              placeholder="Your message"
              required
              autoComplete="off"
              onChange={data}
            ></textarea>
            {
                isAuthenticated?(
                    <button
              className="px-10 py-3 bg-black text-white hover:bg-blue-500 mt-5 rounded-md shadow-md uppercase"
              type="submit"
            >
              send
            </button>
                ):(
                    <button onClick={loginWithRedirect}
              className="px-10 py-3 bg-black text-white hover:bg-blue-500 mt-5 rounded-md shadow-md uppercase"
              type="submit"
            >
              Login to send Message
            </button>
                )
            }
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
