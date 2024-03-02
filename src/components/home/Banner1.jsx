import { Link } from "react-router-dom";
import { icons, banner2 } from "../../assets";

const Banner1 = () => {
  return (
    <div className="md:px-10 py-5 w-full">
      <div className="md:px-10 py-8 bg-gradient-to-r from-slate-900 via-pink-700 to-slate-900 flex justify-between flex-col-reverse md:flex-row md:rounded-md">
        <div className="mt-[10%] ml-8 md:ml-3">
          <h4 className="text-neutral-300 font-semibold text-xl">
            LATEST TECHNOLOGY ADDED
          </h4>
          <h3 className="mt-3 text-5xl mr-[30%] font-semibold text-neutral-300">
            Apple ipad 10.9 10th Gen 2023
          </h3>
          <p className="mt-8 text-neutral-300 text-2xl flex items-center gap-1 mb-10">
            <icons.BsCurrencyDollar /> 481.18
          </p>
          <Link
            to={"/products"}
            className="no-underline px-8 py-3 bg-slate-950 text-white rounded-sm hover:bg-white hover:text-slate-950 flex items-center gap-2 w-fit"
          >
            Shop Now <icons.BsArrowRight />{" "}
          </Link>
        </div>
        <div>
          <img src={banner2} alt="banner-2" />
        </div>
      </div>
    </div>
  );
};
export default Banner1;
