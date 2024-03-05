import { icons, titleCase, truncktext } from "../../assets";
import ProductDetail from "./ProductDetail";
//import auth0 hooks
import { useAuth0 } from "@auth0/auth0-react";

const Product = ({
  products,
  handleCatagory,
  detail,
  setDetail,
  viewDetail,
  open,
  setOpen,
  addToCart
}) => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  return (
    <>
      {open && (
        <ProductDetail
          detail={detail}
          setDetail={setDetail}
          open={open}
          setOpen={setOpen}
        />
      )}
      <div className="px-2 md:px-10 py-10 w-full">
        <h3 className="text-5xl text-center md:text-left uppercase font-normal text-blue-600">
          # Products
        </h3>
        <p className="mt-5 text-neutral-600 text-center md:text-left">
          Home - Products
        </p>
        <div className="mt-5 max-w-full flex flex-col md:flex-row flex-wrap">
          <div className="px-8 py-5">
            <h3 className="font-bold text-neutral-800 uppercase">Catagories</h3>
            <ul className="mt-3 list-none">
              <li
                onClick={() => handleCatagory("men's clothing")}
                className="flex items-center text-neutral-900 mt-5 gap-3 cursor-pointer hover:text-blue-600"
              >
                <icons.FcBusinessman /> Men's Clothing
              </li>
              <li
                onClick={() => handleCatagory("women's clothing")}
                className="flex items-center text-neutral-900 mt-5 gap-3 cursor-pointer hover:text-blue-600"
              >
                <icons.FcBusinesswoman /> Women's Clothing
              </li>
              <li
                onClick={() => handleCatagory("jewelery")}
                className="flex items-center text-neutral-900 mt-5 gap-3 cursor-pointer hover:text-blue-600"
              >
                <icons.GiJewelCrown className="text-yellow-600" /> Jewelery
              </li>
              <li
                onClick={() => handleCatagory("electronics")}
                className="flex items-center text-neutral-900 mt-5 gap-3 cursor-pointer hover:text-blue-600"
              >
                <icons.FcCamcorderPro /> Electronics
              </li>
              <li
                onClick={() => handleCatagory("")}
                className="flex items-center text-neutral-900 mt-5 gap-3 cursor-pointer hover:text-blue-600"
              >
                <icons.GrPowerReset className="text-blue-600" /> Reset
              </li>
            </ul>
          </div>

          <div className="px-10 py-8 w-full bg-blue-50 md:flex-1">
            <div className="mt-5 max-w-full flex justify-start flex-wrap gap-4">
              {products.map((item) => (
                <div
                  key={item.id}
                  className=" px-5 md:py-5 overflow-hidden w-[147px] h-[400px] md:w-[280px] md:h-[360px] shadow-md hover:shadow-xl group rounded-md bg-white"
                >
                  <div className="border-b-2 relative py-8 h-44">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="group-hover:scale-90 transition-all duration-700 max-w-24 max-h-24 md:max-w-36 md:max-h-32 m-auto cursor-pointer"
                    />
                    <div className="absolute top-1 -right-16 transition-all duration-1000 group-hover:-right-2 z-10">
                    {
                    isAuthenticated?(
                      <li
                    onClick={() => addToCart(item)}
                    className="list-none px-3 py-3 rounded-md text-blue-700 cursor-pointer transition-all duration-300 hover:bg-blue-700 hover:text-white shadow-md"
                  >
                    <icons.AiOutlineShoppingCart />
                  </li>
                    ):(
                      <li
                    onClick={() => loginWithRedirect()}
                    className="list-none px-3 py-3 rounded-md text-blue-700 cursor-pointer transition-all duration-300 hover:bg-blue-700 hover:text-white shadow-md"
                  >
                    <icons.AiOutlineShoppingCart />
                  </li>
                    )
                  }
                      <li
                        onClick={() => viewDetail(item)}
                        className="list-none px-3 py-3 rounded-md text-green-500 cursor-pointer transition-all duration-300 hover:bg-green-500 hover:text-white shadow-md"
                      >
                        <icons.BsEye />
                      </li>
                      <li className="list-none px-3 py-3 rounded-md text-red-500 cursor-pointer transition-all duration-300 hover:bg-red-500 hover:text-white shadow-md">
                        <icons.AiOutlineHeart />
                      </li>
                    </div>
                  </div>
                  <div className="mt-3 cursor-default">
                    <p className="text-gray-400 text-md">
                      {titleCase(item.category)}
                    </p>
                    <h3 className="font-bold text-lg group-hover:text-blue-500">
                      {truncktext(item.title)}
                    </h3>
                    <h4 className="mt-2 text-xl font-semibold text-blue-500 flex items-center">
                      <icons.BsCurrencyDollar />
                      {item.price}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
