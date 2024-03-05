import { Link } from "react-router-dom";
import { icons } from "../assets";

const Footer = () => {
  return (
    <div className="w-full px-10 py-8 bg-blue-50">
      <div className="md:px-24 max-w-full flex justify-between flex-col md:flex-row">
        <div className="max-w-full md:max-w-[30%]">
          <div className="mt-3 flex gap-2 items-center">
            <div>
              <icons.FaShopify className="text-blue-600" size={"2rem"} />
            </div>
            <h1 className="text-2xl font-extrabold italic text-blue-600">
              Shopie
            </h1>
          </div>
          <div className="w-full">
            <p className="mt-6 text-lg text-gray-700">
              Welcome to Shopie, your one-stop destination for all your shopping
              needs! Explore our extensive collection of products ranging from
              fashion, electronics, home essentials, beauty, and much more.
            </p>
            <div className="mt-6 flex gap-5 list-none">
              <li className="py-3 px-3 shadow-lg cursor-pointer text-blue-600 hover:bg-blue-600 hover:text-white hover:scale-95 transition-all duration-500 rounded-lg">
                <icons.RiFacebookFill />
              </li>
              <li className="py-3 px-3 shadow-lg cursor-pointer text-pink-600 hover:bg-gradient-to-br hover:from-pink-600 hover:to-yellow-400 hover:text-white hover:scale-95 transition-all duration-500  rounded-lg">
                <icons.AiOutlineInstagram />
              </li>
              <li className="py-3 px-3 shadow-lg cursor-pointer text-blue-400 hover:bg-blue-400 hover:text-white hover:scale-95 transition-all duration-500  rounded-lg">
                <icons.AiOutlineTwitter />
              </li>
              <li className="py-3 px-3 shadow-lg cursor-pointer text-red-700 hover:bg-red-700 hover:text-white hover:scale-95 transition-all duration-500  rounded-lg">
                <icons.BsYoutube />
              </li>
            </div>
          </div>
        </div>
        <div className="flex mt-3 md:mt-0">
        <div className="mt-5 mr-24">
          <h3 className="font-bold text-blue-600 text-2xl ">My Account</h3>
          <ul className="mt-3 ml-5">
            <li className="mt-2 text-neutral-800 text-lg transition-all duration-500 hover:text-blue-400 cursor-pointer list-disc">
              Account
            </li>
            <li className="mt-2 text-neutral-800 text-lg transition-all duration-500 hover:text-blue-400 cursor-pointer list-disc">
              Order
            </li>
            <li className="mt-2 text-neutral-800 text-lg transition-all duration-500 hover:text-blue-400 cursor-pointer list-disc">
              Cart
            </li>
            <li className="mt-2 text-neutral-800 text-lg transition-all duration-500 hover:text-blue-400 cursor-pointer list-disc">
              Shipping
            </li>
            <li className="mt-2 text-neutral-800 text-lg transition-all duration-500 hover:text-blue-400 cursor-pointer list-disc">
              Return
            </li>
          </ul>
        </div>
        <div className="mt-5 mr-24">
          <h3 className="font-bold text-blue-600 text-2xl">Pages</h3>
          <ul className="mt-3 ml-5">
            <li className="mt-2 text-neutral-800 text-lg transition-all duration-500 hover:text-blue-400 cursor-pointer list-disc">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="mt-2 text-neutral-800 text-lg transition-all duration-500 hover:text-blue-400 cursor-pointer list-disc">
              <Link to={"/about"}>About</Link>
            </li>
            <li className="mt-2 text-neutral-800 text-lg transition-all duration-500 hover:text-blue-400 cursor-pointer list-disc">
              <Link to={"/contact"}>Contact</Link>
            </li>
            <li className="mt-2 text-neutral-800 text-lg transition-all duration-500 hover:text-blue-400 cursor-pointer list-disc">
              Term & Condition
            </li>
          </ul>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
