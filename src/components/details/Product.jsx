import { icons, titleCase } from "../../assets";

const Product = ({ products, handleCatagory }) => {
  return (
    <div className="px-2 md:px-10 py-8 w-full">
      <h3 className="text-5xl text-center md:text-left uppercase font-normal text-blue-600">
        # Products
      </h3>
      <p className="mt-5 text-neutral-600 text-center md:text-left">Home - Products</p>
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
        <div className="flex-1">
          <div className="bg-white">
            {products.map((item) => (
              <div
                key={item.id}
                className="mt-4 px-5 md:py-5 overflow-hidden flex-1 shadow-sm hover:shadow-md rounded-md flex gap-5 relative bg-blue-50"
              >
                <div className="my-4 md:my-0 md:py-8 w-36 bg-white rounded-md">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="group-hover:scale-90 transition-all duration-700 max-w-24 max-h-24 md:max-w-36 md:max-h-32 m-auto cursor-pointer my-auto"
                  />
                </div>
                <div className="mt-3 cursor-default">
                  <h3 className="font-bold text-lg group-hover:text-blue-500">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-md">{titleCase(item.category)}</p>
                  <h4 className="mt-2 text-xl font-semibold text-blue-500 flex items-center">
                    <icons.BsCurrencyDollar />
                    {item.price}
                  </h4>
                </div>
                <div className="absolute bottom-2 right-2 md:bottom-10 md:right-10 transition-all duration-1000 z-10 flex gap-3">
                  <li className=" list-none px-1 py-1 md:px-3 md:py-3 rounded-md text-blue-700 cursor-pointer transition-all duration-300 hover:bg-blue-700 hover:text-white shadow-md">
                    <icons.AiOutlineShoppingCart />
                  </li>
                  <li className=" list-none px-1 py-1 md:px-3 md:py-3 rounded-md text-green-700 cursor-pointer transition-all duration-300 hover:bg-green-700 hover:text-white shadow-md">
                    <icons.BsEye />
                  </li>
                  <li className=" list-none px-1 py-1 md:px-3 md:py-3 rounded-md text-red-700 cursor-pointer transition-all duration-300 hover:bg-red-700 hover:text-white shadow-md">
                    <icons.AiOutlineHeart />
                  </li>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
