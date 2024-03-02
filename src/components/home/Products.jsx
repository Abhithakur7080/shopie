import { productData, icons } from "../../assets";

const Products = () => {
  const truncktext = (text) => {
    if (text.length > 30) {
      return text.slice(0, 30) + "...";
    } else {
      return text;
    }
  };
  const titleCase = (text) => {
    return text
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  };
  return (
    <div className="px-10 py-8 w-full bg-blue-50">
      <h2 className="text-2xl text-black font-bold">Top Products</h2>
      <div className="mt-5 max-w-full flex justify-between flex-wrap gap-4">
        {productData.map(({ id, title, image, category, price }) => (
          <div
            key={id}
            className=" px-5 md:py-5 overflow-hidden w-[147px] h-[400px] md:w-[280px] md:h-[360px] shadow-md hover:shadow-xl group rounded-md bg-white"
          >
            <div className="border-b-2 relative py-8 h-44">
              <img
                src={image}
                alt={title}
                className="group-hover:scale-90 transition-all duration-700 max-w-24 max-h-24 md:max-w-36 md:max-h-32 m-auto cursor-pointer"
              />
              <div className="absolute top-1 -right-16 transition-all duration-1000 group-hover:-right-2 z-10">
                <li className="list-none px-3 py-3 rounded-md text-blue-500 cursor-pointer transition-all duration-300 hover:bg-blue-500 hover:text-white shadow-md">
                  <icons.AiOutlineShoppingCart />
                </li>
                <li className="list-none px-3 py-3 rounded-md text-green-500 cursor-pointer transition-all duration-300 hover:bg-green-500 hover:text-white shadow-md">
                  <icons.BsEye />
                </li>
                <li className="list-none px-3 py-3 rounded-md text-red-500 cursor-pointer transition-all duration-300 hover:bg-red-500 hover:text-white shadow-md">
                  <icons.AiOutlineHeart />
                </li>
              </div>
            </div>
            <div className="mt-3 cursor-default">
              <p className="text-gray-400 text-md">{titleCase(category)}</p>
              <h3 className="font-bold text-lg group-hover:text-blue-500">
                {truncktext(title)}
              </h3>
              <h4 className="mt-2 text-xl font-semibold text-blue-500 flex items-center">
                <icons.BsCurrencyDollar />
                {price}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Products;
