import { Link } from "react-router-dom";
import { icons, banner1 } from "../../assets";

const Banner = () => {
  return (
    <div className="py-8 px-10 w-full bg-gradient-to-br from-indigo-500 via-white to-indigo-500">
      <div className="max-w-full flex justify-between flex-col-reverse md:flex-row">
        <div className="mt-5 md:mt-3">
          <h2 className="font-semibold lg:mr-[45%] text-gray-900 text-4xl md:text-6xl">
            The Best Note Book Collection 2024
          </h2>
          <Link
            to={"/products"}
            className="w-fit mt-5 py-3 px-5 rounded-md text-gray-900 bg-white flex items-center shadow-md hover:shadow-lg hover:bg-blue-600 hover:text-white transition-all"
          >
            Shop Now <icons.BsArrowRight className="ml-2" />
          </Link>
        </div>
        <div className="w-full md:w-1/2">
          <img src={banner1} alt="banner" className="w-full" />
          <h3 className="text-2xl font-bold text-center">Galaxy Tab S</h3>
          <p className="text-gray-600 text-center">
            Dynamic AMOLED 2X. Uniform brilliance
          </p>
        </div>
      </div>
    </div>
  );
};
export default Banner;
