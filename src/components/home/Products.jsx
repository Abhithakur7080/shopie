import { productData, icons, truncktext, titleCase } from "../../assets";
//product details view
import { ProductDetail } from "../details/ProductDetail";
// get user info
import { useAuthContext } from "../../redux/AuthProvider";
// use reducer
import { useDispatch, useSelector } from "react-redux";
// use product reducer
import {
  productSelector,
  setProductDetails,
} from "../../redux/Reducer/ProductReducer";
//handle add to cart use
import { addToCart } from "../../redux/Reducer/cartReducer";
import { useEffect } from "react";

const Products = () => {
  const { user } = useAuthContext();
  const { productDetails } = useSelector(productSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    if (productDetails) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Re-enable scrolling
    }
    // Clean up the effect by resetting overflow when the component unmounts or modal closes
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [productDetails]);
  return (
    <>
      {/* details */}
      {productDetails && <ProductDetail />}
      <div className="px-10 py-8 w-full bg-blue-50">
        <h2 className="text-2xl text-black font-bold">Top Products</h2>
        <div className="mt-5 max-w-full flex justify-center md:justify-between flex-wrap gap-4">
          {/* default products */}
          {productData.map((item) => (
            <div
              key={item.id}
              className="px-5 md:py-5 overflow-hidden w-5/6 md:w-[280px] h-fit md:h-[360px] shadow-md hover:shadow-xl group rounded-md bg-white"
            >
              <div className="border-b-2 relative py-8 h-44">
                <img
                  src={item.image}
                  alt={item.title}
                  className="group-hover:scale-90 transition-all duration-700 max-w-24 max-h-24 md:max-w-36 md:max-h-32 m-auto cursor-pointer"
                />
                <div className="absolute top-1 -right-16 transition-all duration-1000 group-hover:-right-2 z-10">
                  {user ? (
                    <li
                      onClick={() =>
                        dispatch(
                          addToCart({ uid: user.uid ? user.uid : null, item })
                        )
                      }
                      className="list-none px-3 py-3 rounded-md text-blue-700 cursor-pointer transition-all duration-300 hover:bg-blue-700 hover:text-white shadow-md"
                    >
                      <icons.AiOutlineShoppingCart />
                    </li>
                  ) : (
                    <li onClick={() =>
                      dispatch(addToCart({ uid: null, item }))
                    } className="list-none px-3 py-3 rounded-md text-blue-700 cursor-pointer transition-all duration-300 hover:bg-blue-700 hover:text-white shadow-md">
                      <icons.AiOutlineShoppingCart />
                    </li>
                  )}
                  <li
                    onClick={() => dispatch(setProductDetails(item))}
                    className="list-none px-3 py-3 rounded-md text-green-700 cursor-pointer transition-all duration-300 hover:bg-green-700 hover:text-white shadow-md"
                  >
                    <icons.BsEye />
                  </li>
                  <li className="list-none px-3 py-3 rounded-md text-red-700 cursor-pointer transition-all duration-300 hover:bg-red-700 hover:text-white shadow-md">
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
                <h4 className="mt-2 mb-2 md:mb-0 text-xl font-semibold text-blue-500 flex items-center">
                  <icons.BsCurrencyDollar />
                  {item.price}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Products;
