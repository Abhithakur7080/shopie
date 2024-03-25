import { useNavigate } from "react-router-dom";
import { productData, icons, truncktext, titleCase } from "../../assets";
import { useFirebase } from "../../config/firebaseinit";
import ProductDetail from "../details/ProductDetail";

const Products = ({
  detail,
  setDetail,
  viewDetail,
  open,
  setOpen,
  addToCart,
}) => {
  const { user } = useFirebase();
  const navigate = useNavigate();
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
      <div className="px-10 py-8 w-full bg-blue-50">
        <h2 className="text-2xl text-black font-bold">Top Products</h2>
        <div className="mt-5 max-w-full flex justify-start flex-wrap gap-4">
          {productData.map((item) => (
            <div
              key={item.id}
              className="px-5 md:py-5 overflow-hidden w-[147px] h-[400px] md:w-[280px] md:h-[360px] shadow-md hover:shadow-xl group rounded-md bg-white"
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
                      onClick={() => addToCart(item)}
                      className="list-none px-3 py-3 rounded-md text-blue-700 cursor-pointer transition-all duration-300 hover:bg-blue-700 hover:text-white shadow-md"
                    >
                      <icons.AiOutlineShoppingCart />
                    </li>
                  ) : (
                    <li
                      onClick={() => navigate("/cart")}
                      className="list-none px-3 py-3 rounded-md text-blue-700 cursor-pointer transition-all duration-300 hover:bg-blue-700 hover:text-white shadow-md"
                    >
                      <icons.AiOutlineShoppingCart />
                    </li>
                  )}
                  <li
                    onClick={() => viewDetail(item)}
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
                <h4 className="mt-2 text-xl font-semibold text-blue-500 flex items-center">
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
