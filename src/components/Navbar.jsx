//imported icons
import { icons } from "../assets";

//import link for routes
import { Link } from "react-router-dom";

//import react hooks
import { useEffect, useState } from "react";
import { useAuth } from "../config/firebaseinit";
import { useAuthContext } from "../redux/AuthProvider";
import { useDispatch, useSelector } from "react-redux";
import {
  productSelector,
  searchItems,
  setProductDetails,
} from "../redux/Reducer/ProductReducer";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [isMenuHidden, setIsMenuHidden] = useState(false);
  const { user } = useAuthContext();
  const auth = useAuth();
  const dispatch = useDispatch();
  const { filteredProducts, searchbox } = useSelector(productSelector);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // You can adjust the threshold as needed
      if (currentScrollY > 50) {
        setIsMenuHidden(true);
      } else {
        setIsMenuHidden(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="w-screen bg-white border-b-2 shadow-sm fixed top-0 z-50">
        {/* free shipping */}
        <div className="bg-black py-2 flex items-center gap-2">
          <div className="text-amber-900 text-2xl ml-10">
            <icons.FaTruck />
          </div>
          <p className="text-white">FREE Shipping when shopping upto $1000</p>
        </div>
        {/* navbar*/}
        <div className="w-4/5 mx-auto flex items-center justify-between">
          <Link to={"/"} className="flex items-center no-underline">
            {/* logo block */}
            <div className="py-5 flex gap-2 items-center">
              <div>
                <icons.FaShopify className="text-blue-600" size={"2rem"} />
              </div>
              <h1 className="text-2xl font-extrabold italic text-blue-600">
                Shopie
              </h1>
            </div>
          </Link>
          {/* search block */}
          <div className="hidden md:w-1/3 md:flex border-4 border-blue-500 relative">
            <div className="flex-1">
               <input
              type="text"
              placeholder="search products here...."
              className="w-full py-1 px-5 outline-none"
              autoComplete="off"
              value={search}
              onChange={(e) => {
                dispatch(searchItems(e.target.value));
                setSearch(e.target.value);
              }}
            />
            </div>
           
            <button
              onClick={(e) => {
                dispatch(searchItems(e.target.value));
                setSearch(e.target.value);
              }}
              className="py-1 px-2 w-[90px] flex items-center justify-center gap-2 text-xl bg-blue-500 text-white"
            >
              <span className="text-center">Search</span>
            </button>
            <div className="absolute left-0 right-0 top-12 max-h-60 overflow-hidden bg-white">
              {searchbox &&
                filteredProducts.map((item) => (
                  <p
                    key={item.id}
                    className="shadow-md p-2 cursor-pointer"
                    onClick={() => {
                      dispatch(setProductDetails(item));
                      dispatch(searchItems(""));
                      setSearch("");
                    }}
                  >
                    {item.title}
                  </p>
                ))}
            </div>
          </div>
          {/* icons block */}
          <div className="flex items-center">
            {/* account icon*/}
            {user && (
              <div className="mr-6 flex  items-center">
                <div className="rounded-full text-center mr-2 text-2xl">
                  {user?.photoURL ? (
                    <img
                      src={user?.photoURL}
                      alt=""
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                  ) : (
                    <icons.AiOutlineUser />
                  )}
                </div>
                <p>Hello, {user?.displayName}</p>
              </div>
            )}

            {/* cart & favourite icons */}
            <div className="flex items-center justify-between gap-2">
              <Link to={"/"} className="cursor-pointer text-xl text-blue-600">
                <icons.AiOutlineHeart />
              </Link>
              <Link
                to={"/cart"}
                className="cursor-pointer text-xl text-blue-600"
              >
                <icons.BsBagCheck />
              </Link>
              <Link
                to={"/order"}
                className="cursor-pointer text-xl text-blue-600"
              >
                <icons.FaTruck />
              </Link>
            </div>
          </div>
        </div>
        <div className="md:hidden w-4/5 mb-4 mx-auto flex border-4 border-blue-500 relative">
          <div className="flex-1">
            <input
              type="text"
              placeholder="search products here...."
              className="w-full py-1 pl-5 outline-none"
              autoComplete="off"
              value={search}
              onChange={(e) => {
                dispatch(searchItems(e.target.value));
                setSearch(e.target.value);
              }}
            />
          </div>

          <button
            onClick={(e) => {
              dispatch(searchItems(e.target.value));
              setSearch(e.target.value);
            }}
            className="py-1 px-2 w-[90px] flex items-center gap-2 text-xl bg-blue-500 text-white"
          >
            <span>Search</span>
          </button>
          <div className="absolute left-0 right-0 top-12 max-h-60 bg-white">
            {searchbox &&
              filteredProducts.map((item) => (
                <p
                  key={item.id}
                  className="shadow-md p-2 cursor-pointer"
                  onClick={() => {
                    dispatch(setProductDetails(item));
                    dispatch(searchItems(""));
                    setSearch("");
                  }}
                >
                  {item.title}
                </p>
              ))}
          </div>
        </div>
      </div>

      {/* menu bar */}
      <div
        className={`w-full px-3 md:px-8 py-5 shadow-lg fixed top-44 md:top-28 bg-white z-40 ${
          isMenuHidden
            ? "-translate-y-full opacity-0"
            : "transition-all duration-500"
        }`}
      >
        <div className="flex w-full justify-between">
          <div className="w-4/5 md:w-fit">
            <ul className="flex gap-5">
              <li>
                <Link
                  className="no-underline text-black transition-all hover:text-blue-600"
                  to={"/"}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="no-underline text-black transition-all hover:text-blue-600"
                  to={"/products"}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  className="no-underline text-black transition-all hover:text-blue-600"
                  to={"/about"}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  className="no-underline text-black transition-all hover:text-blue-600"
                  to={"/contact"}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex gap-5 mr:3 md:mr-5 text-2xl">
            {user ? (
              <button onClick={auth.logoutUser} className="cursor-pointer">
                <icons.CiLogout />
              </button>
            ) : (
              <Link to={"/login"} className="cursor-pointer">
                <icons.CiLogin />
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
