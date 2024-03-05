//imported icons
import { icons } from "../assets";

//import link for routes
import { Link } from "react-router-dom";

//import auth0 hooks
import { useAuth0 } from "@auth0/auth0-react";

//import react hooks
import { useState } from "react";

const Navbar = ({ handleSearch }) => {
  const [search, setSearch] = useState("");
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  return (
    <>
      <div className="w-screen bg-transparent border-b-2 shadow-sm">
        {/* free shipping */}
        <div className="bg-black py-2 flex items-center gap-2">
          <div className="text-amber-900 text-2xl ml-10">
            <icons.FaTruck />
          </div>
          <p className="text-white">FREE Shipping when shopping upto $1000</p>
        </div>
        {/* nav bar*/}

        <Link
          to={"/"}
          className="w-4/5 mx-auto flex items-center justify-between no-underline"
        >
          {/* logo block */}
          <div className="py-5 flex gap-2 items-center">
            <div>
              <icons.FaShopify className="text-blue-600" size={"2rem"} />
            </div>
            <h1 className="text-2xl font-extrabold italic text-blue-600">
              Shopie
            </h1>
          </div>
          {/* search block */}
          <div className="hidden md:w-1/3 md:flex overflow-hidden border-4 border-blue-500">
            <input
              type="text"
              value={search}
              placeholder="search products here...."
              className="flex-1 py-1 px-5 outline-none"
              autoComplete="off"
              onChange={(e) => {setSearch(e.target.value); handleSearch(search)}}
            />
            <button
              onClick={() => handleSearch(search)}
              className="py-1 px-2 flex items-center gap-2 text-xl bg-blue-500 text-white"
            >
              <span>Search</span>
            </button>
          </div>
          {/* icons block */}
          <div className="flex items-center">
            {/* account icon*/}
            {isAuthenticated && (
              <div className="mr-6 flex  items-center">
                <div className="rounded-full text-center mr-2 text-2xl">
                  {user?.picture ? (
                    <img
                      src={user?.picture}
                      alt=""
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                  ) : (
                    <AiOutlineUser />
                  )}
                </div>
                <p>Hello, {user?.given_name}</p>
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
            </div>
          </div>
        </Link>
      </div>
      {/* menu bar */}
      <div className="w-full px-8 py-5 shadow-lg">
        <div className="flex w-full justify-between">
          <div>
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

          <div className="flex gap-5 mr-5 text-2xl">
            {isAuthenticated ? (
              <button
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
                className="cursor-pointer"
              >
                <icons.CiLogout />
              </button>
            ) : (
              <button
                onClick={() => loginWithRedirect()}
                className="cursor-pointer"
              >
                <icons.CiLogin />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
